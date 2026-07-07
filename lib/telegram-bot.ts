import TelegramBot from 'node-telegram-bot-api';
import * as dotenv from 'dotenv';
import { createRequire } from 'module';
import * as fs from 'fs';
import * as path from 'path';

const require = createRequire(import.meta.url);

dotenv.config({ path: '.env.local' });

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const adminIds = process.env.TELEGRAM_ADMIN_IDS?.split(',').map(id => parseInt(id.trim())) || [];

if (!botToken) {
  console.error('TELEGRAM_BOT_TOKEN not set in .env.local');
  process.exit(1);
}

export const bot = new TelegramBot(botToken);

export function isAdmin(userId: number): boolean {
  return adminIds.includes(userId);
}

export function getAdminIds(): number[] {
  return adminIds;
}

interface UserState {
  mode: 'idle' | 'edit_navigation' | 'edit_hero' | 'edit_projects' | 'edit_footer';
  step: number;
  tempData: any;
}

const userStates: Map<number, UserState> = new Map();

export function getUserState(userId: number): UserState {
  if (!userStates.has(userId)) {
    userStates.set(userId, { mode: 'idle', step: 0, tempData: null });
  }
  return userStates.get(userId)!;
}

export function setUserState(userId: number, state: UserState): void {
  userStates.set(userId, state);
}

export function clearUserState(userId: number): void {
  userStates.set(userId, { mode: 'idle', step: 0, tempData: null });
}

// Command handlers
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from?.id;
  
  if (!userId || !isAdmin(userId)) {
    bot.sendMessage(chatId, '⛔ Доступ запрещен. Только администраторы.');
    return;
  }
  
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [{ text: '📋 Навигация', callback_data: 'edit_navigation' }, { text: '🖼 Hero секция', callback_data: 'edit_hero' }],
        [{ text: '🏗 Проекты', callback_data: 'edit_projects' }, { text: '📎 Футер', callback_data: 'edit_footer' }],
        [{ text: '📊 Статистика', callback_data: 'stats' }]
      ]
    }
  };
  
  bot.sendMessage(chatId, '👋 Добро пожаловать в панель управления сайтом!\n\nВыберите раздел для редактирования:', keyboard);
});

// Callback query handler
bot.on('callback_query', (query) => {
  const userId = query.from.id;
  const data = query.data;
  
  if (!isAdmin(userId)) {
    try { bot.answerCallbackQuery(query.id, { text: '⛔ Доступ запрещен' }); } catch (e) {}
    return;
  }
  
  try { bot.answerCallbackQuery(query.id); } catch (e) {}
  
  const chatId = query.message?.chat.id;
  if (!chatId) return;
  
  try {
    switch (data) {
      case 'edit_navigation':
        handleEditNavigation(userId, chatId);
        break;
      case 'nav_edit': {
        const { getAllContent } = require('./content');
        const content = getAllContent();
        const keyboard = {
          inline_keyboard: content.navigation.map((item: any, index: number) => [
            { text: `📌 ${index + 1}. ${item.label}`, callback_data: `nav_edit_item_${index}` }
          ]).concat([[{ text: '↩️ Назад', callback_data: 'back' }]])
        };
        bot.sendMessage(chatId, 'Выберите пункт для редактирования:', { reply_markup: keyboard });
        break;
      }
      case 'nav_edit_item_0': case 'nav_edit_item_1': case 'nav_edit_item_2': case 'nav_edit_item_3':
      case 'nav_edit_item_4': case 'nav_edit_item_5': case 'nav_edit_item_6': case 'nav_edit_item_7':
      case 'nav_edit_item_8': case 'nav_edit_item_9': {
        const itemIndex = parseInt(data.split('_').pop()!);
        showNavigationItemEdit(userId, chatId, itemIndex);
        break;
      }
      case 'nav_item_name': case 'nav_item_name_0': case 'nav_item_name_1': case 'nav_item_name_2':
      case 'nav_item_name_3': case 'nav_item_name_4': case 'nav_item_name_5': case 'nav_item_name_6':
      case 'nav_item_name_7': case 'nav_item_name_8': case 'nav_item_name_9': {
        const itemIndex = parseInt(data.split('_').pop()!);
        setUserState(userId, { mode: 'edit_navigation', step: 10, tempData: { index: itemIndex, type: 'name' } });
        const { getAllContent } = require('./content');
        const content = getAllContent();
        const item = content.navigation[itemIndex];
        bot.sendMessage(chatId, `✏️ Название\n\nТекущее: ${item.label}\n\nНапишите новое название:`, { reply_markup: { force_reply: true } });
        break;
      }
      case 'nav_item_href': {
        const itemIndex = parseInt(data.split('_')[3]);
        setUserState(userId, { mode: 'edit_navigation', step: 10, tempData: { index: itemIndex, type: 'href' } });
        const { getAllContent } = require('./content');
        const content = getAllContent();
        const item = content.navigation[itemIndex];
        bot.sendMessage(chatId, `🔗 Ссылка\n\nТекущая: ${item.href}\n\nНапишите новую ссылку:`, { reply_markup: { force_reply: true } });
        break;
      }
      case 'confirm_nav_item': {
        const state = getUserState(userId);
        if (state.mode === 'edit_navigation' && state.step === 11 && state.tempData) {
          const { index, type, value } = state.tempData;
          const { getAllContent, updateNavigation } = require('./content');
          const content = getAllContent();
          if (type === 'name') content.navigation[index].label = value;
          else if (type === 'href') content.navigation[index].href = value;
          updateNavigation(content.navigation);
          const mainKeyboard = { inline_keyboard: [[{ text: '🏠 Главное меню', callback_data: 'back' }]] };
          bot.sendMessage(chatId, `✅ Обновлено!`, { reply_markup: mainKeyboard });
        }
        clearUserState(userId);
        break;
      }
      case 'cancel_nav_item': {
        const state = getUserState(userId);
        const itemIndex = state.tempData?.index;
        if (itemIndex !== undefined) showNavigationItemEdit(userId, chatId, itemIndex);
        else { bot.sendMessage(chatId, '❌ Отменено.'); clearUserState(userId); }
        break;
      }
      case 'edit_hero': handleEditHero(userId, chatId); break;
      case 'hero_title': startEditHeroTitle(userId, chatId); break;
      case 'hero_desc': startEditHeroDesc(userId, chatId); break;
      case 'hero_image': startEditHeroImage(userId, chatId); break;
      case 'hero_change_title':
        setUserState(userId, { mode: 'edit_hero', step: 1, tempData: null });
        bot.sendMessage(chatId, '✍️ Отправьте новый заголовок:');
        break;
      case 'hero_change_desc':
        setUserState(userId, { mode: 'edit_hero', step: 3, tempData: null });
        bot.sendMessage(chatId, '✍️ Отправьте новое описание:');
        break;
      case 'hero_change_image':
        setUserState(userId, { mode: 'edit_hero', step: 5, tempData: null });
        bot.sendMessage(chatId, '✍️ Отправьте новый путь к фото:');
        break;
      case 'confirm_hero_title': {
        const state = getUserState(userId);
        if (state.mode === 'edit_hero' && state.step === 2 && state.tempData) {
          const { getAllContent, updateHero } = require('./content');
          const content = getAllContent();
          content.hero.title = state.tempData;
          updateHero(content.hero);
          const mainKeyboard = { inline_keyboard: [[{ text: '🏠 Главное меню', callback_data: 'back' }]] };
          bot.sendMessage(chatId, '✅ Заголовок обновлен!', { reply_markup: mainKeyboard });
        }
        clearUserState(userId);
        break;
      }
      case 'cancel_hero_title': { bot.sendMessage(chatId, '❌ Отменено.'); clearUserState(userId); break; }
      case 'confirm_hero_desc': {
        const state = getUserState(userId);
        if (state.mode === 'edit_hero' && state.step === 4 && state.tempData) {
          const { getAllContent, updateHero } = require('./content');
          const content = getAllContent();
          content.hero.description = state.tempData;
          updateHero(content.hero);
          const mainKeyboard = { inline_keyboard: [[{ text: '🏠 Главное меню', callback_data: 'back' }]] };
          bot.sendMessage(chatId, '✅ Описание обновлено!', { reply_markup: mainKeyboard });
        }
        clearUserState(userId);
        break;
      }
      case 'cancel_hero_desc': { bot.sendMessage(chatId, '❌ Отменено.'); clearUserState(userId); break; }
      case 'confirm_hero_image': {
        const state = getUserState(userId);
        if (state.mode === 'edit_hero' && state.step === 6 && state.tempData) {
          const { getAllContent, updateHero } = require('./content');
          const content = getAllContent();
          content.hero.imageUrl = state.tempData;
          updateHero(content.hero);
          const mainKeyboard = { inline_keyboard: [[{ text: '🏠 Главное меню', callback_data: 'back' }]] };
          bot.sendMessage(chatId, '✅ Фото обновлено!', { reply_markup: mainKeyboard });
        }
        clearUserState(userId);
        break;
      }
      case 'cancel_hero_image': { bot.sendMessage(chatId, '❌ Отменено.'); clearUserState(userId); break; }
      case 'edit_projects': handleEditProjects(userId, chatId); break;
      case 'proj_edit': handleEditProjectsList(userId, chatId); break;
      case 'proj_add': {
        setUserState(userId, { mode: 'edit_projects', step: 10, tempData: null });
        bot.sendMessage(chatId, '✍️ Введите название проекта:', { reply_markup: { inline_keyboard: [[{ text: '↩️ Назад', callback_data: 'back' }]] } });
        break;
      }
      case 'proj_delete': startDeleteProject(userId, chatId); break;
      case 'proj_delete_item_0': case 'proj_delete_item_1': case 'proj_delete_item_2': case 'proj_delete_item_3':
      case 'proj_delete_item_4': case 'proj_delete_item_5': case 'proj_delete_item_6': case 'proj_delete_item_7':
      case 'proj_delete_item_8': case 'proj_delete_item_9': {
        const itemIndex = parseInt(data.split('_').pop()!);
        const { getAllContent } = require('./content');
        const content = getAllContent();
        const project = content.projects[itemIndex];
        setUserState(userId, { mode: 'edit_projects', step: 12, tempData: itemIndex });
        const keyboard = {
          inline_keyboard: [
            [{ text: '✅ Удалить', callback_data: 'confirm_delete_project' }],
            [{ text: '↩️ Назад', callback_data: 'back' }]
          ]
        };
        bot.sendMessage(chatId, `🗑 Удалить проект?\n\n📝 ${project.title}\n📄 ${project.description}`, { reply_markup: keyboard });
        break;
      }
      case 'proj_edit_item_0': case 'proj_edit_item_1': case 'proj_edit_item_2': case 'proj_edit_item_3':
      case 'proj_edit_item_4': case 'proj_edit_item_5': case 'proj_edit_item_6': case 'proj_edit_item_7':
      case 'proj_edit_item_8': case 'proj_edit_item_9': {
        const itemIndex = parseInt(data.split('_').pop()!);
        showProjectEditMenu(userId, chatId, itemIndex);
        break;
      }
      case 'proj_edit_name': {
        const state = getUserState(userId);
        if ((state.mode === 'edit_projects') && (state.step === 20 || state.step === 24)) {
          const { getAllContent } = require('./content');
          const content = getAllContent();
          const project = content.projects[state.tempData.index];
          const currentTitle = state.tempData.title || project.title;
          const currentDesc = state.tempData.description || project.description;
          const currentImage = state.tempData.image || project.image;
          setUserState(userId, { ...state, step: 21, tempData: { index: state.tempData.index, title: currentTitle, description: currentDesc, image: currentImage } });
          bot.sendMessage(chatId, '✍️ Введите новое название:');
        }
        break;
      }
      case 'proj_edit_desc': {
        const state = getUserState(userId);
        if ((state.mode === 'edit_projects') && (state.step === 20 || state.step === 24)) {
          const { getAllContent } = require('./content');
          const content = getAllContent();
          const project = content.projects[state.tempData.index];
          const currentTitle = state.tempData.title || project.title;
          const currentDesc = state.tempData.description || project.description;
          const currentImage = state.tempData.image || project.image;
          setUserState(userId, { ...state, step: 22, tempData: { index: state.tempData.index, title: currentTitle, description: currentDesc, image: currentImage } });
          bot.sendMessage(chatId, '✍️ Введите новое описание:\n\nФормат: Название — описание;\n\nПример:\nПроектирование — разработка документации;\nПоставка — материалы;\nМонтаж — установка;');
        }
        break;
      }
      case 'proj_edit_image': {
        const state = getUserState(userId);
        if ((state.mode === 'edit_projects') && (state.step === 20 || state.step === 24)) {
          const { getAllContent } = require('./content');
          const content = getAllContent();
          const project = content.projects[state.tempData.index];
          const currentTitle = state.tempData.title || project.title;
          const currentDesc = state.tempData.description || project.description;
          const currentImage = state.tempData.image || project.image;
          setUserState(userId, { ...state, step: 23, tempData: { index: state.tempData.index, title: currentTitle, description: currentDesc, image: currentImage } });
          bot.sendMessage(chatId, '📸 Отправьте новое фото или введите путь к фото:', { reply_markup: { force_reply: true } });
        }
        break;
      }
      case 'proj_confirm_edit': {
        const state = getUserState(userId);
        if (state.mode === 'edit_projects' && state.step === 24 && state.tempData) {
          const { getAllContent, updateProjects } = require('./content');
          const content = getAllContent();
          const { index, title, description, image } = state.tempData;
          if (title) content.projects[index].title = title;
          if (description) content.projects[index].description = description;
          if (image) content.projects[index].image = image;
          updateProjects(content.projects);
          const mainKeyboard = { inline_keyboard: [[{ text: '🏠 Главное меню', callback_data: 'back' }]] };
          bot.sendMessage(chatId, '✅ Проект обновлён!', { reply_markup: mainKeyboard });
          clearUserState(userId);
        }
        break;
      }
      case 'proj_cancel_edit': {
        const state = getUserState(userId);
        if (state.mode === 'edit_projects' && (state.step === 20 || state.step === 24)) {
          handleEditProjects(userId, chatId);
        }
        break;
      }
      case 'proj_change':
        setUserState(userId, { mode: 'edit_projects', step: 1, tempData: null });
        bot.sendMessage(chatId, '✍️ Отправьте новый список проектов:');
        break;
      case 'confirm_projects': {
        const state = getUserState(userId);
        if (state.mode === 'edit_projects' && state.step === 2 && state.tempData) {
          const lines = state.tempData.split('\n').filter((line: string) => line.trim());
          const { getAllContent, updateProjects } = require('./content');
          const content = getAllContent();
          const newProjects = lines.map((line: string, index: number) => {
            const [title, description, image] = line.split('|').map((s: string) => s.trim());
            return { id: content.projects[index]?.id || index + 1, title: title || 'Без названия', description: description || '', image: image || '/figma/default.png', icon: image || '/figma/default.png', maxHeight: 280 };
          });
          updateProjects(newProjects);
          const mainKeyboard = { inline_keyboard: [[{ text: '🏠 Главное меню', callback_data: 'back' }]] };
          bot.sendMessage(chatId, `✅ Проекты обновлены! ${newProjects.length} проектов.`, { reply_markup: mainKeyboard });
        }
        clearUserState(userId);
        break;
      }
      case 'cancel_projects': { bot.sendMessage(chatId, '❌ Отменено.'); clearUserState(userId); break; }
      case 'confirm_add_project': {
        const state = getUserState(userId);
        if (state.mode === 'edit_projects' && state.step === 13 && state.tempData) {
          const { title, description, image } = state.tempData;
          const { addProject } = require('./content');
          addProject({ title, description, image });
          const mainKeyboard = { inline_keyboard: [[{ text: '🏠 Главное меню', callback_data: 'back' }]] };
          bot.sendMessage(chatId, '✅ Проект добавлен!', { reply_markup: mainKeyboard });
        }
        clearUserState(userId);
        break;
      }
      case 'cancel_add_project': { bot.sendMessage(chatId, '❌ Отменено.'); clearUserState(userId); break; }
      case 'edit_add_title': {
        const state = getUserState(userId);
        if (state.mode === 'edit_projects' && state.step === 13) {
          setUserState(userId, { ...state, step: 14, tempData: state.tempData });
          bot.sendMessage(chatId, '✍️ Введите новое название:');
        }
        break;
      }
      case 'edit_add_desc': {
        const state = getUserState(userId);
        if (state.mode === 'edit_projects' && state.step === 13) {
          setUserState(userId, { ...state, step: 15, tempData: state.tempData });
          bot.sendMessage(chatId, '✍️ Введите новое описание (формат: Название — описание;):');
        }
        break;
      }
      case 'edit_add_image': {
        const state = getUserState(userId);
        if (state.mode === 'edit_projects' && state.step === 13) {
          setUserState(userId, { ...state, step: 16, tempData: state.tempData });
          bot.sendMessage(chatId, '📸 Отправьте новое фото или введите путь к фото:', { reply_markup: { force_reply: true } });
        }
        break;
      }
      case 'confirm_delete_project': {
        const state = getUserState(userId);
        if (state.mode === 'edit_projects' && state.step === 12 && state.tempData !== null) {
          const { deleteProject } = require('./content');
          deleteProject(state.tempData);
          const mainKeyboard = { inline_keyboard: [[{ text: '🏠 Главное меню', callback_data: 'back' }]] };
          bot.sendMessage(chatId, '✅ Проект удалён!', { reply_markup: mainKeyboard });
        }
        clearUserState(userId);
        break;
      }
      case 'cancel_delete_project': { bot.sendMessage(chatId, '❌ Отменено.'); clearUserState(userId); break; }
      case 'edit_footer': handleEditFooter(userId, chatId); break;
      case 'footer_contacts': startEditFooterContacts(userId, chatId); break;
      case 'footer_change_contacts':
        setUserState(userId, { mode: 'edit_footer', step: 1, tempData: null });
        bot.sendMessage(chatId, '✍️ Отправьте новые контакты:');
        break;
      case 'confirm_footer_contacts': {
        const state = getUserState(userId);
        if (state.mode === 'edit_footer' && state.step === 2 && state.tempData) {
          const [phone, email, phoneHref, emailHref] = state.tempData.split('|').map((s: string) => s.trim());
          const { getAllContent, updateFooter } = require('./content');
          const content = getAllContent();
          content.footer.contacts = { phone: phone || content.footer.contacts.phone, email: email || content.footer.contacts.email, phoneHref: phoneHref || content.footer.contacts.phoneHref, emailHref: emailHref || content.footer.contacts.emailHref };
          updateFooter(content.footer);
          const mainKeyboard = { inline_keyboard: [[{ text: '🏠 Главное меню', callback_data: 'back' }]] };
          bot.sendMessage(chatId, '✅ Контакты обновлены!', { reply_markup: mainKeyboard });
        }
        clearUserState(userId);
        break;
      }
      case 'cancel_footer_contacts': { bot.sendMessage(chatId, '❌ Отменено.'); clearUserState(userId); break; }
      case 'stats': handleStats(userId, chatId); break;
      case 'back':
        clearUserState(userId);
        const mainKeyboard = {
          inline_keyboard: [
            [{ text: '📋 Навигация', callback_data: 'edit_navigation' }, { text: '🖼 Hero секция', callback_data: 'edit_hero' }],
            [{ text: '🏗 Проекты', callback_data: 'edit_projects' }, { text: '📎 Футер', callback_data: 'edit_footer' }],
            [{ text: '📊 Статистика', callback_data: 'stats' }]
          ]
        };
        bot.sendMessage(chatId, '👋 Главное меню.\n\nВыберите раздел для редактирования:', { reply_markup: mainKeyboard });
        break;
    }
  } catch (err) {
    console.error('Callback error:', err);
  }
});

async function handleEditNavigation(userId: number, chatId?: number) {
  if (!chatId) return;
  const { getAllContent } = require('./content');
  const content = getAllContent();
  const message = '📋 Текущая навигация:\n\n';
  const items = content.navigation.map((item: any, index: number) => `${index + 1}. ${item.label} → ${item.href}`).join('\n');
  const keyboard = { inline_keyboard: [[{ text: '✏️ Редактировать', callback_data: 'nav_edit' }, { text: '↩️ Назад', callback_data: 'back' }]] };
  bot.sendMessage(chatId, message + items, { reply_markup: keyboard });
  setUserState(userId, { mode: 'edit_navigation', step: 0, tempData: null });
}

function showNavigationItemEdit(userId: number, chatId: number, itemIndex: number) {
  const { getAllContent } = require('./content');
  const content = getAllContent();
  const item = content.navigation[itemIndex];
  const keyboard = { inline_keyboard: [[{ text: '✏️ Изменить название', callback_data: `nav_item_name_${itemIndex}` }], [{ text: '↩️ Назад', callback_data: 'back' }]] };
  bot.sendMessage(chatId, `📌 Редактирование:\n\n📝 Название: ${item.label}\n🔗 Ссылка: ${item.href}\n\nНажмите "Изменить название":`, { reply_markup: keyboard });
}

async function handleEditHero(userId: number, chatId?: number) {
  if (!chatId) return;
  const { getAllContent } = require('./content');
  const content = getAllContent();
  let message = '🖼 Hero секция:\n\n';
  message += `📝 Заголовок: ${content.hero.title}\n📄 Описание: ${content.hero.description}\n🎯 Главный заголовок: ${content.hero.mainTitle}`;
  const keyboard = { inline_keyboard: [[{ text: '✏️ Заголовок', callback_data: 'hero_title' }, { text: '📝 Описание', callback_data: 'hero_desc' }], [{ text: '🖼 Фото', callback_data: 'hero_image' }, { text: '↩️ Назад', callback_data: 'back' }]] };
  bot.sendMessage(chatId, message, { reply_markup: keyboard });
  setUserState(userId, { mode: 'edit_hero', step: 0, tempData: null });
}

function startEditHeroTitle(userId: number, chatId: number) {
  const { getAllContent } = require('./content');
  const content = getAllContent();
  const keyboard = { inline_keyboard: [[{ text: '✏️ Изменить', callback_data: 'hero_change_title' }, { text: '↩️ Назад', callback_data: 'back' }]] };
  bot.sendMessage(chatId, `📝 Текущее:\n\`\`\`\n${content.hero.title}\n\`\`\``, { reply_markup: keyboard });
  setUserState(userId, { mode: 'edit_hero', step: 0, tempData: null });
}

function startEditHeroDesc(userId: number, chatId: number) {
  const { getAllContent } = require('./content');
  const content = getAllContent();
  const keyboard = { inline_keyboard: [[{ text: '✏️ Изменить', callback_data: 'hero_change_desc' }, { text: '↩️ Назад', callback_data: 'back' }]] };
  bot.sendMessage(chatId, `📄 Текущее:\n\`\`\`\n${content.hero.description}\n\`\`\``, { reply_markup: keyboard });
  setUserState(userId, { mode: 'edit_hero', step: 0, tempData: null });
}

function startEditHeroImage(userId: number, chatId: number) {
  const { getAllContent } = require('./content');
  const content = getAllContent();
  const keyboard = { inline_keyboard: [[{ text: '✏️ Изменить', callback_data: 'hero_change_image' }, { text: '↩️ Назад', callback_data: 'back' }]] };
  bot.sendMessage(chatId, `🖼 Текущее:\n\`\`\`\n${content.hero.imageUrl}\n\`\`\``, { reply_markup: keyboard });
  setUserState(userId, { mode: 'edit_hero', step: 0, tempData: null });
}

async function handleEditProjects(userId: number, chatId?: number) {
  if (!chatId) return;
  const { getAllContent } = require('./content');
  const content = getAllContent();
  let message = '🏗 Проекты:\n\nВсего: ' + content.projects.length + '\n\n';
  const projects = content.projects.map((p: any, i: number) => `${i + 1}. ${p.title}`).join('\n');
  const keyboard = {
    inline_keyboard: [
      [{ text: '➕ Добавить', callback_data: 'proj_add' }, { text: '🗑 Удалить', callback_data: 'proj_delete' }],
      ...content.projects.map((p: any, i: number) => [{ text: `✏️ ${i + 1}. ${p.title}`, callback_data: `proj_edit_item_${i}` }]),
      [{ text: '↩️ Назад', callback_data: 'back' }]
    ]
  };
  bot.sendMessage(chatId, message + projects, { parse_mode: 'Markdown', reply_markup: keyboard });
  setUserState(userId, { mode: 'edit_projects', step: 0, tempData: null });
}

function handleEditProjectsList(userId: number, chatId?: number) {
  if (!chatId) return;
  handleEditProjects(userId, chatId);
}

function startDeleteProject(userId: number, chatId: number) {
  const { getAllContent } = require('./content');
  const content = getAllContent();
  if (content.projects.length === 0) { bot.sendMessage(chatId, '❌ Нет проектов.'); return; }
  const keyboard = {
    inline_keyboard: content.projects.map((p: any, i: number) => [{ text: `🗑 ${i + 1}. ${p.title}`, callback_data: `proj_delete_item_${i}` }]).concat([[{ text: '↩️ Назад', callback_data: 'back' }]])
  };
  bot.sendMessage(chatId, '🗑 Выберите проект для удаления:', { reply_markup: keyboard });
}

function showProjectEditMenu(userId: number, chatId: number, index: number) {
  const { getAllContent } = require('./content');
  const content = getAllContent();
  const project = content.projects[index];
  setUserState(userId, { mode: 'edit_projects', step: 20, tempData: { index, title: project.title, description: project.description, image: project.image } });
  const keyboard = {
    inline_keyboard: [
      [{ text: '✏️ Название', callback_data: 'proj_edit_name' }, { text: '📝 Описание', callback_data: 'proj_edit_desc' }],
      [{ text: '🖼 Фото', callback_data: 'proj_edit_image' }],
      [{ text: '↩️ Назад', callback_data: 'proj_cancel_edit' }, { text: '✅ Сохранить', callback_data: 'proj_confirm_edit' }]
    ]
  };
  bot.sendMessage(chatId, `✏️ Редактирование:\n\n📝 ${project.title}\n📄 ${project.description}\n🖼 ${project.image}`, { reply_markup: keyboard });
}

async function handleEditFooter(userId: number, chatId?: number) {
  if (!chatId) return;
  const { getAllContent } = require('./content');
  const content = getAllContent();
  let message = '📎 Футер:\n\n';
  message += `📞 Телефон: ${content.footer.contacts.phone}\n📧 Email: ${content.footer.contacts.email}\n📄 Документов: ${content.footer.documents.length} шт.`;
  const keyboard = { inline_keyboard: [[{ text: '✏️ Контакты', callback_data: 'footer_contacts' }, { text: '📄 Документы', callback_data: 'footer_docs' }], [{ text: '👥 Партнёры', callback_data: 'footer_partners' }, { text: '↩️ Назад', callback_data: 'back' }]] };
  bot.sendMessage(chatId, message, { reply_markup: keyboard });
  setUserState(userId, { mode: 'edit_footer', step: 0, tempData: null });
}

function startEditFooterContacts(userId: number, chatId: number) {
  const { getAllContent } = require('./content');
  const content = getAllContent();
  const keyboard = { inline_keyboard: [[{ text: '✏️ Изменить', callback_data: 'footer_change_contacts' }, { text: '↩️ Назад', callback_data: 'back' }]] };
  bot.sendMessage(chatId, `📞 Контакты:\n\n📞 ${content.footer.contacts.phone}\n📧 ${content.footer.contacts.email}\n🔗 ${content.footer.contacts.phoneHref}\n🔗 ${content.footer.contacts.emailHref}`, { reply_markup: keyboard });
  setUserState(userId, { mode: 'edit_footer', step: 0, tempData: null });
}

async function handleStats(userId: number, chatId?: number) {
  if (!chatId) return;
  const { getAllContent } = require('./content');
  const content = getAllContent();
  const message = `📊 Статистика:\n\n📋 Навигация: ${content.navigation.length}\n🏗 Проекты: ${content.projects.length}\n📄 Документы: ${content.footer.documents.length}\n👥 Партнёры: ${content.footer.partners.length}`;
  bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
}

// Message handler
bot.on('message', async (msg) => {
  const userId = msg.from?.id;
  const chatId = msg.chat.id;
  const text = msg.text;
  
  if (!userId || !chatId) return;
  const state = getUserState(userId);
  if (state.mode === 'idle') return;
  
  // New project: step 10 (name) → step 11 (desc)
  if (state.mode === 'edit_projects' && state.step === 10) {
    setUserState(userId, { ...state, step: 11, tempData: { title: text } });
    bot.sendMessage(chatId, '✍️ Введите описание:\n\nФормат: Название — описание;\n\nПример:\nПроектирование — разработка документации;\nПоставка — материалы;\nМонтаж — установка;', { reply_markup: { inline_keyboard: [[{ text: '↩️ Назад', callback_data: 'back' }]] } });
    return;
  }
  
  // New project: step 11 (desc) → step 12 (photo)
  if (state.mode === 'edit_projects' && state.step === 11) {
    setUserState(userId, { ...state, step: 12, tempData: { ...state.tempData, description: text } });
    bot.sendMessage(chatId, '📸 Отправьте фото или введите путь к фото:', { reply_markup: { inline_keyboard: [[{ text: '↩️ Назад', callback_data: 'back' }]] } });
    return;
  }
  
  // New project: step 12 (photo) → step 13 (confirm)
  if (state.mode === 'edit_projects' && state.step === 12) {
    const { title, description } = state.tempData;
    let imagePath = text || '/figma/default.png';
    const photo = msg.photo?.[msg.photo.length - 1];
    if (photo) {
      const fileId = photo.file_id;
      const filename = `project_${Date.now()}.png`;
      const downloadPath = path.join(process.cwd(), 'public', 'figma', filename);
      const fileStream = bot.getFileStream(fileId);
      await new Promise<void>((resolve, reject) => { fileStream.on('error', reject); fileStream.pipe(fs.createWriteStream(downloadPath)); fileStream.on('end', resolve); });
      imagePath = `/figma/${filename}`;
    }
    setUserState(userId, { ...state, step: 13, tempData: { title, description, image: imagePath } });
    const keyboard = { inline_keyboard: [[{ text: '✏️ Название', callback_data: 'edit_add_title' }, { text: '✏️ Описание', callback_data: 'edit_add_desc' }], [{ text: '🖼 Фото', callback_data: 'edit_add_image' }], [{ text: '↩️ Назад', callback_data: 'back' }, { text: '✅ Сохранить', callback_data: 'confirm_add_project' }]] };
    bot.sendMessage(chatId, `⚠️ Подтвердите:\n\n📝 ${title}\n📄 ${description}\n🖼 ${imagePath}`, { reply_markup: keyboard });
    return;
  }
  
  // Edit from confirm: step 14 (title) → back to 13
  if (state.mode === 'edit_projects' && state.step === 14) {
    const { description, image } = state.tempData || {};
    setUserState(userId, { ...state, step: 13, tempData: { title: text, description, image } });
    const keyboard = { inline_keyboard: [[{ text: '✏️ Название', callback_data: 'edit_add_title' }, { text: '✏️ Описание', callback_data: 'edit_add_desc' }], [{ text: '🖼 Фото', callback_data: 'edit_add_image' }], [{ text: '↩️ Назад', callback_data: 'back' }, { text: '✅ Сохранить', callback_data: 'confirm_add_project' }]] };
    bot.sendMessage(chatId, `⚠️ Подтвердите:\n\n📝 ${text}\n📄 ${description}\n🖼 ${image}`, { reply_markup: keyboard });
    return;
  }
  
  // Edit from confirm: step 15 (desc) → back to 13
  if (state.mode === 'edit_projects' && state.step === 15) {
    const { title, image } = state.tempData || {};
    setUserState(userId, { ...state, step: 13, tempData: { title, description: text, image } });
    const keyboard = { inline_keyboard: [[{ text: '✏️ Название', callback_data: 'edit_add_title' }, { text: '✏️ Описание', callback_data: 'edit_add_desc' }], [{ text: '🖼 Фото', callback_data: 'edit_add_image' }], [{ text: '↩️ Назад', callback_data: 'back' }, { text: '✅ Сохранить', callback_data: 'confirm_add_project' }]] };
    bot.sendMessage(chatId, `⚠️ Подтвердите:\n\n📝 ${title}\n📄 ${text}\n🖼 ${image}`, { reply_markup: keyboard });
    return;
  }
  
  // Edit from confirm: step 16 (image) → back to 13
  if (state.mode === 'edit_projects' && state.step === 16) {
    const { title, description } = state.tempData || {};
    let imagePath = text || '/figma/default.png';
    const photo = msg.photo?.[msg.photo.length - 1];
    if (photo) {
      const fileId = photo.file_id;
      const filename = `project_${Date.now()}.png`;
      const downloadPath = path.join(process.cwd(), 'public', 'figma', filename);
      const fileStream = bot.getFileStream(fileId);
      await new Promise<void>((resolve, reject) => { fileStream.on('error', reject); fileStream.pipe(fs.createWriteStream(downloadPath)); fileStream.on('end', resolve); });
      imagePath = `/figma/${filename}`;
    }
    setUserState(userId, { ...state, step: 13, tempData: { title, description, image: imagePath } });
    const keyboard = { inline_keyboard: [[{ text: '✏️ Название', callback_data: 'edit_add_title' }, { text: '✏️ Описание', callback_data: 'edit_add_desc' }], [{ text: '🖼 Фото', callback_data: 'edit_add_image' }], [{ text: '↩️ Назад', callback_data: 'back' }, { text: '✅ Сохранить', callback_data: 'confirm_add_project' }]] };
    bot.sendMessage(chatId, `⚠️ Подтвердите:\n\n📝 ${title}\n📄 ${description}\n🖼 ${imagePath}`, { reply_markup: keyboard });
    return;
  }
  
  // Edit project: step 21 (name) → step 24 (confirm)
  if (state.mode === 'edit_projects' && state.step === 21) {
    const { index, description, image } = state.tempData || {};
    const newTempData = { index, title: text, description, image };
    setUserState(userId, { ...state, step: 24, tempData: newTempData });
    showProjectConfirm(userId, chatId, newTempData);
    return;
  }
  
  // Edit project: step 22 (desc) → step 24 (confirm)
  if (state.mode === 'edit_projects' && state.step === 22) {
    const { index, title, image } = state.tempData || {};
    const newTempData = { index, title, description: text, image };
    setUserState(userId, { ...state, step: 24, tempData: newTempData });
    showProjectConfirm(userId, chatId, newTempData);
    return;
  }
  
  // Edit project: step 23 (image) → step 24 (confirm)
  if (state.mode === 'edit_projects' && state.step === 23) {
    const { index, title, description } = state.tempData || {};
    let imagePath = text || '/figma/default.png';
    const photo = msg.photo?.[msg.photo.length - 1];
    if (photo) {
      const fileId = photo.file_id;
      const filename = `project_${Date.now()}.png`;
      const downloadPath = path.join(process.cwd(), 'public', 'figma', filename);
      const fileStream = bot.getFileStream(fileId);
      await new Promise<void>((resolve, reject) => { fileStream.on('error', reject); fileStream.pipe(fs.createWriteStream(downloadPath)); fileStream.on('end', resolve); });
      imagePath = `/figma/${filename}`;
    }
    const newTempData = { index, title, description, image: imagePath };
    setUserState(userId, { ...state, step: 24, tempData: newTempData });
    showProjectConfirm(userId, chatId, newTempData);
    return;
  }
  
  // Navigation edit: step 10 (name) → step 11 (confirm)
  if (state.mode === 'edit_navigation' && state.step === 10) {
    const { index, type } = state.tempData;
    setUserState(userId, { ...state, step: 11, tempData: { ...state.tempData, value: text } });
    const { getAllContent } = require('./content');
    const content = getAllContent();
    const item = content.navigation[index];
    const fieldName = type === 'name' ? 'Название' : 'Ссылка';
    const keyboard = { inline_keyboard: [[{ text: '✅ Подтвердить', callback_data: 'confirm_nav_item' }, { text: '↩️ Назад', callback_data: 'cancel_nav_item' }]] };
    bot.sendMessage(chatId, `⚠️ Подтвердите:\n\n📝 ${fieldName}\n📋 Текущее: ${type === 'name' ? item.label : item.href}\n✨ Новое: ${text}`, { reply_markup: keyboard });
    return;
  }
  
  // Navigation bulk edit: step 1
  if (state.mode === 'edit_navigation' && state.step === 1) {
    setUserState(userId, { ...state, step: 2, tempData: text });
    const { getAllContent } = require('./content');
    const content = getAllContent();
    const keyboard = { inline_keyboard: [[{ text: '✅ Сохранить', callback_data: 'confirm_navigation' }, { text: '❌ Отмена', callback_data: 'cancel_navigation' }]] };
    bot.sendMessage(chatId, `⚠️ Подтвердите навигацию:\n\`\`\`\n${text}\n\`\`\``, { reply_markup: keyboard });
    return;
  }
  
  // Hero edit: step 1 (title) → step 2 (confirm)
  if (state.mode === 'edit_hero' && state.step === 1) {
    setUserState(userId, { ...state, step: 2, tempData: text });
    const { getAllContent } = require('./content');
    const content = getAllContent();
    const keyboard = { inline_keyboard: [[{ text: '✅ Сохранить', callback_data: 'confirm_hero_title' }, { text: '❌ Отмена', callback_data: 'cancel_hero_title' }]] };
    bot.sendMessage(chatId, `⚠️ Новый: \`\`\`\n${text}\n\`\`\`\n\nТекущий: \`\`\`\n${content.hero.title}\n\`\`\``, { reply_markup: keyboard });
    return;
  }
  
  // Hero edit: step 3 (desc) → step 4 (confirm)
  if (state.mode === 'edit_hero' && state.step === 3) {
    setUserState(userId, { ...state, step: 4, tempData: text });
    const { getAllContent } = require('./content');
    const content = getAllContent();
    const keyboard = { inline_keyboard: [[{ text: '✅ Сохранить', callback_data: 'confirm_hero_desc' }, { text: '❌ Отмена', callback_data: 'cancel_hero_desc' }]] };
    bot.sendMessage(chatId, `⚠️ Новое: \`\`\`\n${text}\n\`\`\`\n\nТекущее: \`\`\`\n${content.hero.description}\n\`\`\``, { reply_markup: keyboard });
    return;
  }
  
  // Hero edit: step 5 (image) → step 6 (confirm)
  if (state.mode === 'edit_hero' && state.step === 5) {
    let imagePath = text || '/figma/default.png';
    const photo = msg.photo?.[msg.photo.length - 1];
    if (photo) {
      const fileId = photo.file_id;
      const filename = `hero_${Date.now()}.png`;
      const downloadPath = path.join(process.cwd(), 'public', 'figma', filename);
      const fileStream = bot.getFileStream(fileId);
      await new Promise<void>((resolve, reject) => { fileStream.on('error', reject); fileStream.pipe(fs.createWriteStream(downloadPath)); fileStream.on('end', resolve); });
      imagePath = `/figma/${filename}`;
    }
    setUserState(userId, { ...state, step: 6, tempData: imagePath });
    const { getAllContent } = require('./content');
    const content = getAllContent();
    const keyboard = { inline_keyboard: [[{ text: '✅ Сохранить', callback_data: 'confirm_hero_image' }, { text: '❌ Отмена', callback_data: 'cancel_hero_image' }]] };
    bot.sendMessage(chatId, `⚠️ Новое: \`\`\`\n${imagePath}\n\`\`\`\n\nТекущее: \`\`\`\n${content.hero.imageUrl}\n\`\`\``, { reply_markup: keyboard });
    return;
  }
  
  // Projects bulk edit: step 1 → step 2 (confirm)
  if (state.mode === 'edit_projects' && state.step === 1) {
    setUserState(userId, { ...state, step: 2, tempData: text });
    const { getAllContent } = require('./content');
    const content = getAllContent();
    const keyboard = { inline_keyboard: [[{ text: '✅ Сохранить', callback_data: 'confirm_projects' }, { text: '❌ Отмена', callback_data: 'cancel_projects' }]] };
    bot.sendMessage(chatId, `⚠️ Подтвердите проекты:\n\`\`\`\n${text}\n\`\`\``, { reply_markup: keyboard });
    return;
  }
  
  // Footer edit: step 1 → step 2 (confirm)
  if (state.mode === 'edit_footer' && state.step === 1) {
    setUserState(userId, { ...state, step: 2, tempData: text });
    const { getAllContent } = require('./content');
    const content = getAllContent();
    const keyboard = { inline_keyboard: [[{ text: '✅ Сохранить', callback_data: 'confirm_footer_contacts' }, { text: '❌ Отмена', callback_data: 'cancel_footer_contacts' }]] };
    bot.sendMessage(chatId, `⚠️ Новые контакты:\n\`\`\`\n${text}\n\`\`\``, { reply_markup: keyboard });
    return;
  }
});

function showProjectConfirm(userId: number, chatId: number, data: any) {
  const keyboard = {
    inline_keyboard: [
      [{ text: '✏️ Название', callback_data: 'proj_edit_name' }, { text: '📝 Описание', callback_data: 'proj_edit_desc' }],
      [{ text: '🖼 Фото', callback_data: 'proj_edit_image' }],
      [{ text: '↩️ Назад', callback_data: 'proj_cancel_edit' }, { text: '✅ Сохранить', callback_data: 'proj_confirm_edit' }]
    ]
  };
  const title = data.title || '—';
  const desc = data.description || '—';
  const image = data.image || '—';
  bot.sendMessage(chatId, `⚠️ Подтвердите изменения:\n\n📝 ${title}\n📄 ${desc}\n🖼 ${image}`, { reply_markup: keyboard });
}

bot.on('polling_error', (error: any) => {
  console.log('Polling error (ignored):', error.code);
});

bot.startPolling();
console.log('🤖 Telegram Bot started and polling...');

process.on('uncaughtException', (err) => {
  console.error('Uncaught error (ignored):', err.message);
});
