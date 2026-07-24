import TelegramBot from 'node-telegram-bot-api';
import * as dotenv from 'dotenv';
import { createRequire } from 'module';
import * as fs from 'fs';
import * as path from 'path';
import { uploadFileToGitHub } from './git-sync';

const require = createRequire(import.meta.url);

dotenv.config({ path: '.env.local' });

const CERT_DIR = path.join(process.cwd(), 'public', 'documents', 'certificates');

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const adminIds = process.env.TELEGRAM_ADMIN_IDS?.split(',').map((id: string) => parseInt(id.trim())) || [];
const VERCEL_DEPLOY_HOOK = process.env.VERCEL_DEPLOY_HOOK;

if (!botToken) {
  console.warn('⚠️ TELEGRAM_BOT_TOKEN not set — Telegram bot disabled');
}

// Создаем бота с прокси если указан
const botOptions: any = {};
const proxy = process.env.HTTP_PROXY || process.env.HTTPS_PROXY;
if (proxy) {
  console.log('🌐 Using Telegram proxy:', proxy);
  const { HttpsProxyAgent } = require('https-proxy-agent');
  botOptions.request = {
    agent: new HttpsProxyAgent(proxy)
  };
}

export const bot = new TelegramBot(botToken!, botOptions);

export function isAdmin(userId: number): boolean {
  return adminIds.includes(userId);
}

export function getAdminIds(): number[] {
  return adminIds;
}

interface UserState {
  mode: 'idle' | 'edit_navigation' | 'edit_hero' | 'edit_projects' | 'edit_footer' | 'edit_certificates';
  step: number;
  tempData: any;
}

// Хелпер для отправки уведомлений о деплое
function sendDeployNotification(chatId: number, bot: any, initialMsg: string): void {
  const mainKeyboard = { inline_keyboard: [[{ text: '🏠 Главное меню', callback_data: 'back' }]] };
  
  // Сразу показываем "Деплой начнётся"
  bot.sendMessage(chatId, initialMsg + '\n\n🚀 Данные отправлены в GitHub...', { reply_markup: mainKeyboard });
  
  // Через 10 секунд показываем "Готово" (сайт читает из GitHub напрямую, без ребилда)
  setTimeout(() => {
    bot.sendMessage(chatId, '✅ Сайт обновлён!\n\n👀 Посмотри результат: https://dk-grupp.vercel.app', { reply_markup: mainKeyboard });
  }, 10000);
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
        [{ text: '📊 Статистика', callback_data: 'stats' }],
        [{ text: '📝 Получить расчет', callback_data: 'get_calculation' }]
      ]
    }
  };
  
  bot.sendMessage(chatId, '👋 Добро пожаловать в панель управления сайтом!\n\nВыберите раздел для редактирования:', keyboard);
});

// Callback query handler
bot.on('callback_query', async (query) => {
  const userId = query.from.id;
  const data = query.data;
  console.log('📩 Callback received:', data, 'from user:', userId);
  
  if (!isAdmin(userId)) {
    try { bot.answerCallbackQuery(query.id, { text: '⛔ Доступ запрещен' }); } catch (e) {}
    return;
  }
  
  try { bot.answerCallbackQuery(query.id); } catch (e) {}
  
  const chatId = query.message?.chat.id;
  const text = query.message && 'text' in query.message ? query.message.text : undefined;
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
      case 'nav_edit_item_8': case 'nav_edit_item_9': case 'nav_edit_item_10': case 'nav_edit_item_11':
      case 'nav_edit_item_12': case 'nav_edit_item_13': case 'nav_edit_item_14': case 'nav_edit_item_15':
      case 'nav_edit_item_16': case 'nav_edit_item_17': case 'nav_edit_item_18': case 'nav_edit_item_19':
      case 'nav_edit_item_20': {
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
        bot.sendMessage(chatId, `✏️ Название\n\nТекущее: ${item.label}\n\nНапишите новое название:`, { reply_markup: { inline_keyboard: [[{ text: '↩️ Назад', callback_data: 'back' }]] } });
        break;
      }
      case 'nav_item_href': {
        const itemIndex = parseInt(data.split('_')[3]);
        setUserState(userId, { mode: 'edit_navigation', step: 10, tempData: { index: itemIndex, type: 'href' } });
        const { getAllContent } = require('./content');
        const content = getAllContent();
        const item = content.navigation[itemIndex];
        bot.sendMessage(chatId, `🔗 Ссылка\n\nТекущая: ${item.href}\n\nНапишите новую ссылку:`, { reply_markup: { inline_keyboard: [[{ text: '↩️ Назад', callback_data: 'back' }]] } });
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
          sendDeployNotification(chatId, bot, '✅ Обновлено!');
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
      case 'hero_change_title':
        setUserState(userId, { mode: 'edit_hero', step: 1, tempData: null });
        bot.sendMessage(chatId, '✍️ Отправьте новый заголовок:');
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
      case 'hero_image': startEditHeroImage(userId, chatId); break;
      case 'hero_change_image':
        setUserState(userId, { mode: 'edit_hero', step: 5, tempData: null });
        bot.sendMessage(chatId, '✍️ Отправьте новый путь к фото:');
        break;
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
      case 'proj_reorder': startReorderProjects(userId, chatId); break;
      case 'confirm_reorder': {
        const state = getUserState(userId);
        if (state.mode === 'edit_projects' && state.step === 18 && state.tempData) {
          const orderStr = state.tempData;
          const order = orderStr.split(/[\s,]+/).map((n: string) => parseInt(n) - 1).filter((n: number) => !isNaN(n) && n >= 0);
          const { getAllContent, updateProjects } = require('./content');
          const content = getAllContent();
          const newProjects = order.map((idx: number) => content.projects[idx]).filter(Boolean);
          if (newProjects.length === content.projects.length) {
            updateProjects(newProjects);
            sendDeployNotification(chatId, bot, '✅ Порядок проектов обновлён!');
          } else {
            bot.sendMessage(chatId, '❌ Ошибка: не все проекты найдены.');
          }
        }
        clearUserState(userId);
        break;
      }
      case 'proj_edit': handleEditProjectsList(userId, chatId); break;
      case 'proj_add': {
        setUserState(userId, { mode: 'edit_projects', step: 10, tempData: null });
        bot.sendMessage(chatId, '✍️ Введите название проекта:', { reply_markup: { inline_keyboard: [[{ text: '↩️ Назад', callback_data: 'back' }]] } });
        break;
      }
      case 'proj_delete': startDeleteProject(userId, chatId); break;
      case 'proj_delete_item_0': case 'proj_delete_item_1': case 'proj_delete_item_2': case 'proj_delete_item_3':
      case 'proj_delete_item_4': case 'proj_delete_item_5': case 'proj_delete_item_6': case 'proj_delete_item_7':
      case 'proj_delete_item_8': case 'proj_delete_item_9': case 'proj_delete_item_10': case 'proj_delete_item_11':
      case 'proj_delete_item_12': case 'proj_delete_item_13': case 'proj_delete_item_14': case 'proj_delete_item_15':
      case 'proj_delete_item_16': case 'proj_delete_item_17': case 'proj_delete_item_18': case 'proj_delete_item_19':
      case 'proj_delete_item_20': {
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
      case 'proj_edit_item_8': case 'proj_edit_item_9': case 'proj_edit_item_10': case 'proj_edit_item_11':
      case 'proj_edit_item_12': case 'proj_edit_item_13': case 'proj_edit_item_14': case 'proj_edit_item_15':
      case 'proj_edit_item_16': case 'proj_edit_item_17': case 'proj_edit_item_18': case 'proj_edit_item_19':
      case 'proj_edit_item_20': {
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
          bot.sendMessage(chatId, '📸 Отправьте новое фото или введите путь к фото:', { reply_markup: { inline_keyboard: [[{ text: '↩️ Назад', callback_data: 'back' }]] } });
        }
        break;
      }
      case 'proj_confirm_edit': {
        const state = getUserState(userId);
        if (state.mode === 'edit_projects' && state.step === 24 && state.tempData) {
          const { index, title, description, image } = state.tempData;
          
          // Фото уже загружено в GitHub на шаге 12/23, просто сохраняем проект
          const { getAllContent, updateProjects } = require('./content');
          const content = getAllContent();
          if (title) content.projects[index].title = title;
          if (description) content.projects[index].description = description;
          if (image) content.projects[index].image = image;
          updateProjects(content.projects);
          sendDeployNotification(chatId, bot, '✅ Проект обновлён!');
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
          sendDeployNotification(chatId, bot, `✅ Проекты обновлены! ${newProjects.length} проектов.`);
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
          await addProject({ title, description, image });
          sendDeployNotification(chatId, bot, '✅ Проект добавлен!');
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
          bot.sendMessage(chatId, '📸 Отправьте новое фото или введите путь к фото:', { reply_markup: { inline_keyboard: [[{ text: '↩️ Назад', callback_data: 'back' }]] } });
        }
        break;
      }
      case 'confirm_delete_project': {
        const state = getUserState(userId);
        if (state.mode === 'edit_projects' && state.step === 12 && state.tempData !== null) {
          const { deleteProject } = require('./content');
          await deleteProject(state.tempData);
          sendDeployNotification(chatId, bot, '✅ Проект удалён!');
        }
        clearUserState(userId);
        break;
      }
      case 'cancel_delete_project': { bot.sendMessage(chatId, '❌ Отменено.'); clearUserState(userId); break; }
      case 'edit_footer': handleEditFooter(userId, chatId); break;
      case 'footer_partners': handleEditPartners(userId, chatId); break;
      case 'partner_edit_0': case 'partner_edit_1': case 'partner_edit_2': case 'partner_edit_3': case 'partner_edit_4': case 'partner_edit_5': case 'partner_edit_6': case 'partner_edit_7':
      case 'partner_edit_8': case 'partner_edit_9': case 'partner_edit_10': case 'partner_edit_11': case 'partner_edit_12': case 'partner_edit_13':
      case 'partner_edit_14': case 'partner_edit_15': case 'partner_edit_16': case 'partner_edit_17': case 'partner_edit_18': case 'partner_edit_19':
      case 'partner_edit_20': case 'partner_edit_21': case 'partner_edit_22': case 'partner_edit_23': case 'partner_edit_24': case 'partner_edit_25':
      case 'partner_edit_26': case 'partner_edit_27': case 'partner_edit_28': case 'partner_edit_29': case 'partner_edit_30': {
        const itemIndex = parseInt(data.split('_').pop()!);
        const { getAllContent } = require('./content');
        const content = getAllContent();
        const partner = content.footer.partners[itemIndex];
        setUserState(userId, { mode: 'edit_footer', step: 30, tempData: { index: itemIndex, name: partner.name } });
        const keyboard = { inline_keyboard: [[{ text: '✏️ Изменить имя', callback_data: 'partner_edit_name' }, { text: '🖼 Иконка', callback_data: `partner_edit_image_${itemIndex}` }], [{ text: '🗑 Удалить', callback_data: `partner_delete_${itemIndex}` }], [{ text: '↩️ Назад', callback_data: 'footer_partners' }, { text: '✅ Сохранить', callback_data: 'partner_confirm_edit' }]] };
        bot.sendMessage(chatId, `✏️ Редактирование партнёра:\n\n📝 Имя: ${partner.name}\n🖼 ${partner.image || '—'}`, { reply_markup: keyboard });
        break;
      }
      case 'partner_edit_name': {
        const state = getUserState(userId);
        if (state.mode === 'edit_footer' && state.step === 30) {
          setUserState(userId, { ...state, step: 31 });
          bot.sendMessage(chatId, '✍️ Введите новое имя партнёра:');
        }
        break;
      }
      case 'partner_edit_image_0': case 'partner_edit_image_1': case 'partner_edit_image_2': case 'partner_edit_image_3': case 'partner_edit_image_4': case 'partner_edit_image_5': case 'partner_edit_image_6': case 'partner_edit_image_7':
      case 'partner_edit_image_8': case 'partner_edit_image_9': case 'partner_edit_image_10': case 'partner_edit_image_11': case 'partner_edit_image_12': case 'partner_edit_image_13':
      case 'partner_edit_image_14': case 'partner_edit_image_15': case 'partner_edit_image_16': case 'partner_edit_image_17': case 'partner_edit_image_18': case 'partner_edit_image_19':
      case 'partner_edit_image_20': case 'partner_edit_image_21': case 'partner_edit_image_22': case 'partner_edit_image_23': case 'partner_edit_image_24': case 'partner_edit_image_25':
      case 'partner_edit_image_26': case 'partner_edit_image_27': case 'partner_edit_image_28': case 'partner_edit_image_29': case 'partner_edit_image_30': {
        const itemIndex = parseInt(data.split('_').pop()!);
        const state = getUserState(userId);
        if (state.mode === 'edit_footer' && state.step === 30) {
          setUserState(userId, { ...state, step: 34, tempData: { ...state.tempData, imageIndex: itemIndex } });
          bot.sendMessage(chatId, '🖼 Отправьте иконку партнёра в формате PNG:');
        }
        break;
      }
      case 'partner_confirm_edit': {
        const state = getUserState(userId);
        if (state.mode === 'edit_footer' && state.step === 31 && state.tempData) {
          const { getAllContent, updateFooter } = require('./content');
          const content = getAllContent();
          const { index, name } = state.tempData;
          if (name) content.footer.partners[index].name = name;
          updateFooter(content.footer);
          const mainKeyboard = { inline_keyboard: [[{ text: '🏠 Главное меню', callback_data: 'back' }]] };
          bot.sendMessage(chatId, '✅ Партнёр обновлён!', { reply_markup: mainKeyboard });
        }
        clearUserState(userId);
        break;
      }
      case 'partner_delete_0': case 'partner_delete_1': case 'partner_delete_2': case 'partner_delete_3': case 'partner_delete_4': case 'partner_delete_5': case 'partner_delete_6': case 'partner_delete_7':
      case 'partner_delete_8': case 'partner_delete_9': case 'partner_delete_10': case 'partner_delete_11': case 'partner_delete_12': case 'partner_delete_13':
      case 'partner_delete_14': case 'partner_delete_15': case 'partner_delete_16': case 'partner_delete_17': case 'partner_delete_18': case 'partner_delete_19':
      case 'partner_delete_20': case 'partner_delete_21': case 'partner_delete_22': case 'partner_delete_23': case 'partner_delete_24': case 'partner_delete_25':
      case 'partner_delete_26': case 'partner_delete_27': case 'partner_delete_28': case 'partner_delete_29': case 'partner_delete_30': {
        const itemIndex = parseInt(data.split('_').pop()!);
        const { getAllContent, updateFooter } = require('./content');
        const content = getAllContent();
        const partner = content.footer.partners[itemIndex];
        const confirmKeyboard = { inline_keyboard: [[{ text: '✅ Удалить', callback_data: `partner_delete_confirm_${itemIndex}` }, { text: '❌ Отмена', callback_data: 'footer_partners' }]] };
        bot.sendMessage(chatId, `❌ Удалить партнёра "${partner.name}"?`, { reply_markup: confirmKeyboard });
        break;
      }
      case 'partner_delete_confirm_0': case 'partner_delete_confirm_1': case 'partner_delete_confirm_2': case 'partner_delete_confirm_3': case 'partner_delete_confirm_4': case 'partner_delete_confirm_5': case 'partner_delete_confirm_6': case 'partner_delete_confirm_7':
      case 'partner_delete_confirm_8': case 'partner_delete_confirm_9': case 'partner_delete_confirm_10': case 'partner_delete_confirm_11': case 'partner_delete_confirm_12': case 'partner_delete_confirm_13':
      case 'partner_delete_confirm_14': case 'partner_delete_confirm_15': case 'partner_delete_confirm_16': case 'partner_delete_confirm_17': case 'partner_delete_confirm_18': case 'partner_delete_confirm_19':
      case 'partner_delete_confirm_20': case 'partner_delete_confirm_21': case 'partner_delete_confirm_22': case 'partner_delete_confirm_23': case 'partner_delete_confirm_24': case 'partner_delete_confirm_25':
      case 'partner_delete_confirm_26': case 'partner_delete_confirm_27': case 'partner_delete_confirm_28': case 'partner_delete_confirm_29': case 'partner_delete_confirm_30': {
        const itemIndex = parseInt(data.split('_').pop()!);
        const { getAllContent, updateFooter } = require('./content');
        const content = getAllContent();
        content.footer.partners.splice(itemIndex, 1);
        updateFooter(content.footer);
        handleEditPartners(userId, chatId);
        break;
      }
      case 'partner_add': {
        setUserState(userId, { mode: 'edit_footer', step: 32, tempData: null });
        bot.sendMessage(chatId, '✍️ Введите имя нового партнёра:');
        break;
      }
      case 'partner_add_name': {
        const state = getUserState(userId);
        if (state.mode === 'edit_footer' && state.step === 32) {
          setUserState(userId, { ...state, step: 33, tempData: { name: state.tempData } });
          bot.sendMessage(chatId, '🖼 Отправьте иконку партнёра в формате PNG:');
        }
        break;
      }
      case 'footer_docs': handleEditDocuments(userId, chatId); break;
      case 'footer_docs_cert': handleEditCertificates(userId, chatId); break;
      case 'cert_add': startAddCertificate(userId, chatId); break;
      case 'cert_delete': startDeleteCertificate(userId, chatId); break;
      case 'cert_delete_item_0': case 'cert_delete_item_1': case 'cert_delete_item_2': case 'cert_delete_item_3':
      case 'cert_delete_item_4': case 'cert_delete_item_5': case 'cert_delete_item_6': case 'cert_delete_item_7':
      case 'cert_delete_item_8': case 'cert_delete_item_9': case 'cert_delete_item_10': case 'cert_delete_item_11':
      case 'cert_delete_item_12': case 'cert_delete_item_13': case 'cert_delete_item_14': case 'cert_delete_item_15':
      case 'cert_delete_item_16': case 'cert_delete_item_17': case 'cert_delete_item_18': case 'cert_delete_item_19':
      case 'cert_delete_item_20': case 'cert_delete_item_21': case 'cert_delete_item_22': case 'cert_delete_item_23':
      case 'cert_delete_item_24': case 'cert_delete_item_25': case 'cert_delete_item_26': case 'cert_delete_item_27':
      case 'cert_delete_item_28': case 'cert_delete_item_29': case 'cert_delete_item_30': {
        const itemIndex = parseInt(data.split('_').pop()!);
        console.log('🗑 Deleting cert item:', itemIndex, 'data:', data);
        const { getCertificates } = require('./content');
        const certs = await getCertificates();
        const cert = certs[itemIndex];
        console.log('🗑 Cert found:', cert);
        setUserState(userId, { mode: 'edit_certificates', step: 12, tempData: itemIndex });
        const keyboard = {
          inline_keyboard: [
            [{ text: '✅ Удалить', callback_data: 'confirm_delete_cert' }],
            [{ text: '↩️ Назад', callback_data: 'back' }]
          ]
        };
        bot.sendMessage(chatId, `🗑 Удалить сертификат?\n\n📝 ${cert.name}\n📄 ${cert.filename}`, { reply_markup: keyboard });
        break;
      }
      case 'confirm_delete_cert': {
        const state = getUserState(userId);
        if (state.mode === 'edit_certificates' && state.step === 12 && state.tempData !== null) {
          const { deleteCertificate } = require('./content');
          await deleteCertificate(state.tempData);
          sendDeployNotification(chatId, bot, '✅ Сертификат удалён!');
        }
        clearUserState(userId);
        break;
      }
      case 'cert_edit_0': case 'cert_edit_1': case 'cert_edit_2': case 'cert_edit_3':
      case 'cert_edit_4': case 'cert_edit_5': case 'cert_edit_6': case 'cert_edit_7':
      case 'cert_edit_8': case 'cert_edit_9': case 'cert_edit_10': case 'cert_edit_11':
      case 'cert_edit_12': case 'cert_edit_13': case 'cert_edit_14': case 'cert_edit_15':
      case 'cert_edit_16': case 'cert_edit_17': case 'cert_edit_18': case 'cert_edit_19':
      case 'cert_edit_20': case 'cert_edit_21': case 'cert_edit_22': case 'cert_edit_23':
      case 'cert_edit_24': case 'cert_edit_25': case 'cert_edit_26': case 'cert_edit_27':
      case 'cert_edit_28': case 'cert_edit_29': case 'cert_edit_30': {
        const itemIndex = parseInt(data.split('_').pop()!);
        const { getCertificates } = require('./content');
        const certs = await getCertificates();
        const cert = certs[itemIndex];
        setUserState(userId, { mode: 'edit_certificates', step: 20, tempData: { index: itemIndex, name: cert.name, category: cert.category, filename: cert.filename } });
        const categoryNames: Record<string, string> = { 'windows': 'Окна', 'facade': 'Витражи', 'doors': 'Двери', 'glass-partitions': 'Внутренние стеклянные перегородки', 'other': 'Прочее' };
        const keyboard = {
          inline_keyboard: [
            [{ text: '✏️ Название', callback_data: 'cert_edit_name' }, { text: '📂 Категория', callback_data: 'cert_edit_category' }],
            [{ text: '↩️ Назад', callback_data: 'back' }, { text: '✅ Сохранить', callback_data: 'cert_confirm_edit' }]
          ]
        };
        bot.sendMessage(chatId, `✏️ Редактирование сертификата:\n\n📝 ${cert.name}\n📂 ${categoryNames[cert.category] || cert.category}`, { reply_markup: keyboard });
        break;
      }
      case 'cert_edit_name': {
        const state = getUserState(userId);
        if (state.mode === 'edit_certificates' && (state.step === 20 || state.step === 24)) {
          setUserState(userId, { ...state, step: 21, tempData: state.tempData });
          bot.sendMessage(chatId, '✍️ Введите новое название:', { reply_markup: { inline_keyboard: [[{ text: '↩️ Назад', callback_data: 'back' }]] } });
        }
        break;
      }
      case 'cert_edit_category': {
        const state = getUserState(userId);
        if (state.mode === 'edit_certificates' && (state.step === 20 || state.step === 24)) {
          setUserState(userId, { ...state, step: 22, tempData: state.tempData });
          bot.sendMessage(chatId, '📂 Выберите категорию:\n\n1 — Допуски СРО\n2 — ISO\n3 — Пожарная безопасность\n4 — Окна\n5 — Витражи и фасады\n6 — Двери\n7 — Внутренние стеклянные перегородки\n8 — Прочие', { reply_markup: { inline_keyboard: [[{ text: '↩️ Назад', callback_data: 'back' }]] } });
        }
        break;
      }
      case 'cert_confirm_edit': {
        const state = getUserState(userId);
        if (state.mode === 'edit_certificates' && state.step === 24 && state.tempData) {
          const { index, name, category } = state.tempData;
          const { getCertificates, saveCertificates } = require('./content');
          const certs = await getCertificates();
          if (name) certs[index].name = name;
          if (category) certs[index].category = category;
          saveCertificates(certs);
          sendDeployNotification(chatId, bot, '✅ Сертификат обновлён!');
        }
        clearUserState(userId);
        break;
      }
      case 'cert_add_name': {
        setUserState(userId, { mode: 'edit_certificates', step: 14, tempData: { name: text } });
        bot.sendMessage(chatId, '📂 Выберите категорию:\n\n1 — Допуски СРО\n2 — ISO\n3 — Пожарная безопасность\n4 — Окна\n5 — Витражи и фасады\n6 — Двери\n7 — Прочие', { reply_markup: { inline_keyboard: [[{ text: '↩️ Назад', callback_data: 'back' }]] } });
        break;
      }
      case 'cert_add_category': {
        const state = getUserState(userId);
        const categoryMap: Record<string, string> = {
          '1': 'sro', '2': 'iso', '3': 'fire', '4': 'windows', '5': 'facade', '6': 'doors', '7': 'other'
        };
        const category = text ? (categoryMap[text] || 'other') : 'other';
        setUserState(userId, { ...state, step: 15, tempData: { name: state.tempData?.name || '', category } });
        bot.sendMessage(chatId, '📸 Отправьте фото или PDF файла, или введите путь к файлу:', { reply_markup: { inline_keyboard: [[{ text: '↩️ Назад', callback_data: 'back' }]] } });
        break;
      }
      case 'cert_confirm': {
        const state = getUserState(userId);
        if (state.mode === 'edit_certificates' && state.step === 16 && state.tempData) {
          const { name, category, filename } = state.tempData;
          const { addCertificate } = require('./content');
          await addCertificate(filename, name, category);
          sendDeployNotification(chatId, bot, '✅ Сертификат добавлен!');
        }
        clearUserState(userId);
        break;
      }
      case 'cert_cancel': {
        bot.sendMessage(chatId, '❌ Отменено.');
        clearUserState(userId);
        break;
      }
      case 'doc_edit_0': case 'doc_edit_1': case 'doc_edit_2': case 'doc_edit_3': case 'doc_edit_4': case 'doc_edit_5': case 'doc_edit_6': case 'doc_edit_7': case 'doc_edit_8': case 'doc_edit_9':
      case 'doc_edit_10': case 'doc_edit_11': case 'doc_edit_12': case 'doc_edit_13': case 'doc_edit_14': case 'doc_edit_15':
      case 'doc_edit_16': case 'doc_edit_17': case 'doc_edit_18': case 'doc_edit_19': case 'doc_edit_20': {
        const itemIndex = parseInt(data.split('_').pop()!);
        const { getAllContent } = require('./content');
        const content = getAllContent();
        const doc = content.footer.documents[itemIndex];
        setUserState(userId, { mode: 'edit_footer', step: 20, tempData: { index: itemIndex, name: doc.name, href: doc.href, type: doc.type } });
        const keyboard = {
          inline_keyboard: [
            [{ text: '✏️ Название', callback_data: 'doc_edit_name' }, { text: '🔗 Ссылка', callback_data: 'doc_edit_href' }],
            [{ text: '↩️ Назад', callback_data: 'back' }, { text: '✅ Сохранить', callback_data: 'doc_confirm_edit' }]
          ]
        };
        bot.sendMessage(chatId, `✏️ Редактирование документа:\n\n📝 ${doc.name}\n🔗 ${doc.href || '—'}`, { reply_markup: keyboard });
        break;
      }
      case 'doc_edit_name': {
        const state = getUserState(userId);
        if (state.mode === 'edit_footer' && (state.step === 20 || state.step === 24)) {
          const { getAllContent } = require('./content');
          const content = getAllContent();
          const doc = content.footer.documents[state.tempData.index];
          setUserState(userId, { ...state, step: 21, tempData: { index: state.tempData.index, name: doc.name, href: doc.href, type: doc.type } });
          bot.sendMessage(chatId, '✍️ Введите новое название:');
        }
        break;
      }
      case 'doc_edit_href': {
        const state = getUserState(userId);
        if (state.mode === 'edit_footer' && (state.step === 20 || state.step === 24)) {
          const { getAllContent } = require('./content');
          const content = getAllContent();
          const doc = content.footer.documents[state.tempData.index];
          setUserState(userId, { ...state, step: 22, tempData: { index: state.tempData.index, name: doc.name, href: doc.href, type: doc.type } });
          bot.sendMessage(chatId, '✍️ Введите новую ссылку (путь к файлу):');
        }
        break;
      }
      case 'doc_confirm_edit': {
        const state = getUserState(userId);
        if (state.mode === 'edit_footer' && state.step === 24 && state.tempData) {
          const { getAllContent, updateFooter } = require('./content');
          const content = getAllContent();
          const { index, name, href } = state.tempData;
          if (name) content.footer.documents[index].name = name;
          if (href) content.footer.documents[index].href = href;
          updateFooter(content.footer);
          const mainKeyboard = { inline_keyboard: [[{ text: '🏠 Главное меню', callback_data: 'back' }]] };
          bot.sendMessage(chatId, '✅ Документ обновлён!', { reply_markup: mainKeyboard });
        }
        clearUserState(userId);
        break;
      }
      case 'footer_docs': handleEditDocuments(userId, chatId); break;
      case 'footer_docs_cert': handleEditCertificates(userId, chatId); break;
      case 'footer_contacts': startEditFooterContacts(userId, chatId); break;
      case 'footer_change_contacts':
        setUserState(userId, { mode: 'edit_footer', step: 10, tempData: null });
        bot.sendMessage(chatId, '✍️ Введите телефон (например: +7 (911) 999-49-95):');
        break;
      case 'confirm_footer_contacts': {
        const state = getUserState(userId);
        if (state.mode === 'edit_footer' && state.step === 12 && state.tempData) {
          const { phone, email } = state.tempData;
          const { getAllContent, updateFooter } = require('./content');
          const content = getAllContent();
          content.footer.contacts = { ...content.footer.contacts, phone, email };
          updateFooter(content.footer);
          sendDeployNotification(chatId, bot, `✅ Контакты обновлены!

📞 ${phone}
📧 ${email}`);
        }
        clearUserState(userId);
        break;
      }
      case 'cancel_footer_contacts': { bot.sendMessage(chatId, '❌ Отменено.'); clearUserState(userId); break; }
      case 'cancel_reorder': { bot.sendMessage(chatId, '❌ Отменено.'); clearUserState(userId); break; }
      case 'stats': 
        handleStats(userId, chatId).catch(err => console.error('handleStats error:', err));
        break;
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
  message += `📝 Заголовок: ${content.hero.title}\n🎯 Главный заголовок: ${content.hero.mainTitle}`;
  const keyboard = { inline_keyboard: [[{ text: '✏️ Заголовок', callback_data: 'hero_title' }], [{ text: '🖼 Фото', callback_data: 'hero_image' }, { text: '↩️ Назад', callback_data: 'back' }]] };
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
      [{ text: '🔄 Порядок', callback_data: 'proj_reorder' }],
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

function startReorderProjects(userId: number, chatId: number) {
  const { getAllContent } = require('./content');
  const content = getAllContent();
  const projects = content.projects.map((p: any, i: number) => `${i + 1}. ${p.title}`).join('\n');
  setUserState(userId, { mode: 'edit_projects', step: 17, tempData: null });
  bot.sendMessage(chatId, `🔄 Изменить порядок проектов\n\n📋 Текущий порядок:\n${projects}\n\n📝 Введите новый порядок через ПРОБЕЛ:\n\nПример: 3 1 5 2 4\n\n⚠️ Важно:\n• Каждое число — номер проекта\n• Числа через пробел (не слитно!)\n• Все номера должны быть от 1 до ${content.projects.length}\n• Без повторов`, { reply_markup: { inline_keyboard: [[{ text: '↩️ Назад', callback_data: 'back' }]] } });
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

async function startDeleteCertificate(userId: number, chatId: number) {
  const { getCertificates } = require('./content');
  const certs = await getCertificates();
  if (certs.length === 0) { bot.sendMessage(chatId, '❌ Нет сертификатов.'); return; }
  const keyboard = {
    inline_keyboard: certs.map((c: any, i: number) => [{ text: `🗑 ${i + 1}. ${c.name}`, callback_data: `cert_delete_item_${i}` }]).concat([[{ text: '↩️ Назад', callback_data: 'back' }]])
  };
  bot.sendMessage(chatId, '🗑 Выберите сертификат для удаления:', { reply_markup: keyboard });
}

function startAddCertificate(userId: number, chatId: number) {
  setUserState(userId, { mode: 'edit_certificates', step: 13, tempData: null });
  bot.sendMessage(chatId, '✍️ Введите название сертификата:', { reply_markup: { inline_keyboard: [[{ text: '↩️ Назад', callback_data: 'back' }]] } });
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

 async function handleEditPartners(userId: number, chatId?: number) {
   if (!chatId) return;
   const { getAllContent } = require('./content');
   const content = getAllContent();
   let message = '👥 Партнёры:\n\n';
   const partners = content.footer.partners.map((p: any, i: number) => `${i + 1}. ${p.name}`).join('\n');
   const keyboard = {
     inline_keyboard: [
       ...content.footer.partners.map((p: any, i: number) => [{ text: `✏️ ${i + 1}. ${p.name}`, callback_data: `partner_edit_${i}` }, { text: '🗑', callback_data: `partner_delete_${i}` }]),
       [{ text: '➕ Добавить', callback_data: 'partner_add' }],
       [{ text: '↩️ Назад', callback_data: 'back' }]
     ]
   };
   bot.sendMessage(chatId, message + partners, { reply_markup: keyboard });
 }

async function handleEditDocuments(userId: number, chatId?: number) {
  if (!chatId) return;
  const { getAllContent } = require('./content');
  const content = getAllContent();
  let message = '📄 Документы:\n\n';
  const docs = content.footer.documents.map((d: any, i: number) => `${i + 1}. ${d.name}`).join('\n');
  const keyboard = {
    inline_keyboard: [
      [{ text: '📜 Сертификаты', callback_data: 'footer_docs_cert' }],
      ...content.footer.documents.map((d: any, i: number) => [{ text: `✏️ ${i + 1}. ${d.name}`, callback_data: `doc_edit_${i}` }]),
      [{ text: '↩️ Назад', callback_data: 'back' }]
    ]
  };
  bot.sendMessage(chatId, message + docs, { reply_markup: keyboard });
}

async function handleEditCertificates(userId: number, chatId?: number) {
  if (!chatId) return;
  const { getCertificates } = require('./content');
  const certs = await getCertificates();
  
  const categoryNames: Record<string, string> = {
    'sro': '🏗 Допуски СРО',
    'iso': '📋 ISO',
    'fire': '🔥 Пожарная безопасность',
    'windows': '🪟 Окна',
    'facade': '🏢 Витражи и фасады',
    'doors': '🚪 Двери',
    'glass-partitions': '🔲 Внутренние стеклянные перегородки',
    'other': '📄 Прочие'
  };
  
  // Группируем по категориям как на сайте
  const grouped: Record<string, any[]> = { sro: [], iso: [], fire: [], windows: [], facade: [], doors: [], 'glass-partitions': [], other: [] };
  certs.forEach((c: any, i: number) => {
    if (grouped[c.category]) {
      grouped[c.category].push({ ...c, index: i });
    }
  });
  
  let message = '📜 Сертификаты:\n\n';
  let hasAny = false;
  for (const [cat, items] of Object.entries(grouped)) {
    if (items.length > 0) {
      hasAny = true;
      message += `${categoryNames[cat]} (${items.length}):\n`;
      items.forEach((c: any) => {
        message += `  ${c.index + 1}. ${c.name}\n`;
      });
      message += '\n';
    }
  }
  
  if (!hasAny) {
    message += 'Нет сертификатов';
  }
  
  const keyboard = {
    inline_keyboard: [
      [{ text: '➕ Добавить', callback_data: 'cert_add' }, { text: '🗑 Удалить', callback_data: 'cert_delete' }],
      ...certs.map((c: any, i: number) => [{ text: `✏️ ${i + 1}. ${c.name}`, callback_data: `cert_edit_${i}` }]),
      [{ text: '↩️ Назад', callback_data: 'back' }]
    ]
  };
  bot.sendMessage(chatId, message, { reply_markup: keyboard });
  setUserState(userId, { mode: 'edit_certificates', step: 0, tempData: null });
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
  console.log('handleStats called for user:', userId, 'chat:', chatId);
  try {
    const { getAllContent, getCertificates } = require('./content');
    const content = getAllContent();
    const certificates = await getCertificates();
    console.log('Content loaded:', Object.keys(content));
    const message = `📊 Статистика:\n\n📋 Навигация: ${content.navigation.length}\n🏗 Проекты: ${content.projects.length}\n📄 Документы: ${content.footer.documents.length}\n📑 Сертификаты: ${certificates.length}\n👥 Партнёры: ${content.footer.partners.length}`;
    console.log('Sending message:', message);
    await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    console.log('Message sent successfully');
  } catch (err) {
    console.error('Error in handleStats:', err);
  }
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
      const fileBuffer = await new Promise<Buffer>((resolve, reject) => {
        const fileStream = bot.getFileStream(fileId);
        const chunks: Buffer[] = [];
        fileStream.on('data', (chunk: Buffer) => chunks.push(chunk));
        fileStream.on('end', () => resolve(Buffer.concat(chunks)));
        fileStream.on('error', reject);
      });
      // Загружаем сразу в GitHub без сохранения на диск
      const uploadResult = await uploadFileToGitHub(`public/figma/${filename}`, fileBuffer, `Add project image: ${title}`);
      if (uploadResult.success) {
        imagePath = `/figma/${filename}`;
        console.log('✅ Photo uploaded to GitHub:', imagePath);
      } else {
        console.error('❌ Failed to upload photo to GitHub:', uploadResult.message);
        bot.sendMessage(chatId, '⚠️ Фото не удалось загрузить в GitHub. Попробуйте ещё раз.', { reply_markup: { inline_keyboard: [[{ text: '↩️ Назад', callback_data: 'back' }]] } });
        clearUserState(userId);
        return;
      }
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
      const fileBuffer = await new Promise<Buffer>((resolve, reject) => {
        const fileStream = bot.getFileStream(fileId);
        const chunks: Buffer[] = [];
        fileStream.on('data', (chunk: Buffer) => chunks.push(chunk));
        fileStream.on('end', () => resolve(Buffer.concat(chunks)));
        fileStream.on('error', reject);
      });
      const uploadResult = await uploadFileToGitHub(`public/figma/${filename}`, fileBuffer, `Add project image: ${title}`);
      if (uploadResult.success) {
        imagePath = `/figma/${filename}`;
      } else {
        console.error('❌ Failed to upload photo to GitHub:', uploadResult.message);
      }
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
      const fileBuffer = await new Promise<Buffer>((resolve, reject) => {
        const fileStream = bot.getFileStream(fileId);
        const chunks: Buffer[] = [];
        fileStream.on('data', (chunk: Buffer) => chunks.push(chunk));
        fileStream.on('end', () => resolve(Buffer.concat(chunks)));
        fileStream.on('error', reject);
      });
      const uploadResult = await uploadFileToGitHub(`public/figma/${filename}`, fileBuffer, `Update project image: ${title}`);
      if (uploadResult.success) {
        imagePath = `/figma/${filename}`;
        console.log('✅ Photo uploaded to GitHub:', imagePath);
      } else {
        console.error('❌ Failed to upload photo to GitHub:', uploadResult.message);
      }
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
  
  // Hero edit: step 5 (image) → step 6 (confirm)
  if (state.mode === 'edit_hero' && state.step === 5) {
    let imagePath = text || '/figma/default.png';
    const photo = msg.photo?.[msg.photo.length - 1];
    if (photo) {
      const fileId = photo.file_id;
      const filename = `hero_${Date.now()}.png`;
      const fileBuffer = await new Promise<Buffer>((resolve, reject) => {
        const fileStream = bot.getFileStream(fileId);
        const chunks: Buffer[] = [];
        fileStream.on('data', (chunk: Buffer) => chunks.push(chunk));
        fileStream.on('end', () => resolve(Buffer.concat(chunks)));
        fileStream.on('error', reject);
      });
      const uploadResult = await uploadFileToGitHub(`public/figma/${filename}`, fileBuffer, `Update hero image`);
      if (uploadResult.success) {
        imagePath = `/figma/${filename}`;
        console.log('✅ Hero photo uploaded to GitHub:', imagePath);
      } else {
        console.error('❌ Failed to upload hero photo to GitHub:', uploadResult.message);
        bot.sendMessage(chatId, '⚠️ Фото не удалось загрузить. Попробуйте ещё раз.', { reply_markup: { inline_keyboard: [[{ text: '↩️ Назад', callback_data: 'back' }]] } });
        clearUserState(userId);
        return;
      }
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
  
  // Footer edit: step 10 (phone) → step 11 (email)
  if (state.mode === 'edit_footer' && state.step === 10) {
    setUserState(userId, { ...state, step: 11, tempData: { phone: text } });
    bot.sendMessage(chatId, '✍️ Введите email (например: info@dkfasad.ru):');
    return;
  }
  
  // Footer edit: step 11 (email) → step 12 (confirm)
  if (state.mode === 'edit_footer' && state.step === 11) {
    const { phone } = state.tempData || {};
    setUserState(userId, { ...state, step: 12, tempData: { phone, email: text } });
    const keyboard = { inline_keyboard: [[{ text: '✅ Сохранить', callback_data: 'confirm_footer_contacts' }, { text: '❌ Отмена', callback_data: 'cancel_footer_contacts' }]] };
    bot.sendMessage(chatId, `⚠️ Подтвердите контакты:\n\n📞 ${phone}\n📧 ${text}`, { reply_markup: keyboard });
    return;
  }
  
  // Footer partner edit: step 31 (name) → step 32 (confirm)
  if (state.mode === 'edit_footer' && state.step === 31) {
    const { index } = state.tempData || {};
    setUserState(userId, { ...state, step: 32, tempData: { index, name: text } });
    const keyboard = { inline_keyboard: [[{ text: '✏️ Имя', callback_data: 'partner_edit_name' }], [{ text: '↩️ Назад', callback_data: 'partner_edit_name' }, { text: '✅ Сохранить', callback_data: 'partner_confirm_edit' }]] };
    bot.sendMessage(chatId, `⚠️ Подтвердите:\n\n📝 ${text}`, { reply_markup: keyboard });
    return;
  }
  
  // Footer partner add: step 32 (name) → step 33 (photo)
  if (state.mode === 'edit_footer' && state.step === 32 && !state.tempData?.index) {
    setUserState(userId, { ...state, step: 33, tempData: { name: text } });
    bot.sendMessage(chatId, '🖼 Отправьте иконку партнёра в формате PNG:');
    return;
  }
  
  // Footer partner add: step 33 (photo) → save
  if (state.mode === 'edit_footer' && state.step === 33) {
    const { name } = state.tempData || {};
    let imagePath = '/figma/default-partner.png';
    const photo = msg.photo?.[msg.photo.length - 1];
    if (photo) {
      const fileId = photo.file_id;
      const filename = `partner_${Date.now()}.png`;
      const fileBuffer = await new Promise<Buffer>((resolve, reject) => {
        const fileStream = bot.getFileStream(fileId);
        const chunks: Buffer[] = [];
        fileStream.on('data', (chunk: Buffer) => chunks.push(chunk));
        fileStream.on('end', () => resolve(Buffer.concat(chunks)));
        fileStream.on('error', reject);
      });
      const uploadResult = await uploadFileToGitHub(`public/figma/${filename}`, fileBuffer, `Add partner icon: ${name}`);
      if (uploadResult.success) {
        imagePath = `/figma/${filename}`;
      } else {
        console.error('❌ Failed to upload partner icon to GitHub:', uploadResult.message);
      }
    }
    const { getAllContent, updateFooter } = require('./content');
    const content = getAllContent();
    content.footer.partners.push({ name, image: imagePath });
    updateFooter(content.footer);
    sendDeployNotification(chatId, bot, `✅ Партнёр добавлен!

📝 ${name}
🖼 ${imagePath}`);
    clearUserState(userId);
    return;
  }
  
  // Footer partner edit image: step 34 (photo) → save
  if (state.mode === 'edit_footer' && state.step === 34) {
    const { imageIndex } = state.tempData || {};
    let imagePath = '/figma/default-partner.png';
    const photo = msg.photo?.[msg.photo.length - 1];
    if (photo) {
      const fileId = photo.file_id;
      const filename = `partner_${Date.now()}.png`;
      const fileBuffer = await new Promise<Buffer>((resolve, reject) => {
        const fileStream = bot.getFileStream(fileId);
        const chunks: Buffer[] = [];
        fileStream.on('data', (chunk: Buffer) => chunks.push(chunk));
        fileStream.on('end', () => resolve(Buffer.concat(chunks)));
        fileStream.on('error', reject);
      });
      const uploadResult = await uploadFileToGitHub(`public/figma/${filename}`, fileBuffer, `Update partner icon`);
      if (uploadResult.success) {
        imagePath = `/figma/${filename}`;
      } else {
        console.error('❌ Failed to upload partner icon to GitHub:', uploadResult.message);
      }
    }
    const { getAllContent, updateFooter } = require('./content');
    const content = getAllContent();
    if (imageIndex !== undefined && content.footer.partners[imageIndex]) {
      content.footer.partners[imageIndex].image = imagePath;
      updateFooter(content.footer);
      sendDeployNotification(chatId, bot, `✅ Иконка обновлена!

🖼 ${imagePath}`);
    }
    clearUserState(userId);
    return;
  }
  
  // Reorder projects: step 17 (order) → step 18 (confirm)
  if (state.mode === 'edit_projects' && state.step === 17) {
    const { getAllContent } = require('./content');
    const content = getAllContent();
    const total = content.projects.length;
    
    if (!text) {
      bot.sendMessage(chatId, '❌ Ошибка: текст не может быть пустым.', { reply_markup: { inline_keyboard: [[{ text: '↩️ Назад', callback_data: 'back' }]] } });
      return;
    }
    
    const parts = text.trim().split(/[\s,]+/).filter(p => p.trim());
    const numbers = parts.map((n: string) => parseInt(n));
    
    // Проверка: все числа?
    if (numbers.some(n => isNaN(n))) {
      bot.sendMessage(chatId, `❌ Ошибка: введите только числа через пробел.\n\nПример: 3 1 5 2 4`, { reply_markup: { inline_keyboard: [[{ text: '↩️ Назад', callback_data: 'back' }]] } });
      return;
    }
    
    // Проверка: правильное количество?
    if (numbers.length !== total) {
      bot.sendMessage(chatId, `❌ Ошибка: введено ${numbers.length} чисел, а нужно ${total}.\n\nУ вас ${total} проектов — введите все номера через пробел.\n\nПример: 3 1 5 2 4`, { reply_markup: { inline_keyboard: [[{ text: '↩️ Назад', callback_data: 'back' }]] } });
      return;
    }
    
    // Проверка: числа в диапазоне?
    if (numbers.some(n => n < 1 || n > total)) {
      bot.sendMessage(chatId, `❌ Ошибка: номера должны быть от 1 до ${total}.`, { reply_markup: { inline_keyboard: [[{ text: '↩️ Назад', callback_data: 'back' }]] } });
      return;
    }
    
    // Проверка: нет повторов?
    if (new Set(numbers).size !== numbers.length) {
      bot.sendMessage(chatId, `❌ Ошибка: есть повторяющиеся номера. Каждый номер должен быть один раз.`, { reply_markup: { inline_keyboard: [[{ text: '↩️ Назад', callback_data: 'back' }]] } });
      return;
    }
    
    setUserState(userId, { ...state, step: 18, tempData: text });
    const projects = content.projects.map((p: any, i: number) => `${i + 1}. ${p.title}`).join('\n');
    const keyboard = { inline_keyboard: [[{ text: '✅ Сохранить', callback_data: 'confirm_reorder' }, { text: '❌ Отмена', callback_data: 'cancel_reorder' }]] };
    bot.sendMessage(chatId, `⚠️ Новый порядок:\n\`\`\`\n${text}\n\`\`\`\n\nТекущий:\n${projects}`, { reply_markup: keyboard, parse_mode: 'Markdown' });
    return;
  }
  
  // Certificate: step 13 (name) → step 14 (category)
  if (state.mode === 'edit_certificates' && state.step === 13) {
    setUserState(userId, { ...state, step: 14, tempData: { name: text } });
    bot.sendMessage(chatId, '📂 Выберите категорию:\n\n1 — Допуски СРО\n2 — ISO\n3 — Пожарная безопасность\n4 — Окна\n5 — Витражи и фасады\n6 — Двери\n7 — Внутренние стеклянные перегородки\n8 — Прочие', { reply_markup: { inline_keyboard: [[{ text: '↩️ Назад', callback_data: 'back' }]] } });
    return;
  }
  
  // Certificate: step 14 (category) → step 15 (file)
  if (state.mode === 'edit_certificates' && state.step === 14) {
    const { name } = state.tempData;
    const categoryMap: Record<string, string> = {
      '1': 'sro', '2': 'iso', '3': 'fire', '4': 'windows', '5': 'facade', '6': 'doors', '7': 'glass-partitions', '8': 'other'
    };
    const category = text ? (categoryMap[text] || 'other') : 'other';
    setUserState(userId, { ...state, step: 15, tempData: { name, category } });
    bot.sendMessage(chatId, '📸 Отправьте фото или PDF файла, или введите путь к файлу:', { reply_markup: { inline_keyboard: [[{ text: '↩️ Назад', callback_data: 'back' }]] } });
    return;
  }
  
  // Certificate: step 15 (file) → step 16 (confirm)
  if (state.mode === 'edit_certificates' && state.step === 15) {
    const { name, category } = state.tempData;
    let filename = text || `cert_${Date.now()}.pdf`;
    let fileId: string | undefined;
    let isPdf = false;
    
    // Check for photo (image)
    const photo = msg.photo?.[msg.photo.length - 1];
    if (photo) {
      fileId = photo.file_id;
      const ext = '.png';
      filename = `cert_${Date.now()}${ext}`;
    }
    // Check for document (PDF)
    else if (msg.document && msg.document.mime_type === 'application/pdf') {
      fileId = msg.document.file_id;
      isPdf = true;
      filename = `cert_${Date.now()}.pdf`;
    }
    
    // Download file to memory and upload to GitHub
    if (fileId) {
      try {
        const fileBuffer = await new Promise<Buffer>((resolve, reject) => {
          const fileStream = bot.getFileStream(fileId);
          const chunks: Buffer[] = [];
          fileStream.on('data', (chunk: Buffer) => chunks.push(chunk));
          fileStream.on('end', () => resolve(Buffer.concat(chunks)));
          fileStream.on('error', reject);
        });
        
        const uploadResult = await uploadFileToGitHub(`public/documents/certificates/${filename}`, fileBuffer, `Add certificate: ${name}`);
        if (!uploadResult.success) {
          console.error('❌ Failed to upload certificate to GitHub:', uploadResult.message);
          bot.sendMessage(chatId, '❌ Ошибка при загрузке файла в GitHub. Попробуйте еще раз.', { reply_markup: { inline_keyboard: [[{ text: '↩️ Назад', callback_data: 'back' }]] } });
          return;
        }
        console.log('✅ Certificate uploaded to GitHub:', filename);
      } catch (error) {
        console.error('Error downloading certificate file:', error);
        bot.sendMessage(chatId, '❌ Ошибка при загрузке файла. Попробуйте еще раз.', { reply_markup: { inline_keyboard: [[{ text: '↩️ Назад', callback_data: 'back' }]] } });
        return;
      }
    }
    
    setUserState(userId, { ...state, step: 16, tempData: { name, category, filename } });
    const keyboard = { inline_keyboard: [[{ text: '✅ Сохранить', callback_data: 'cert_confirm' }, { text: '❌ Отмена', callback_data: 'cert_cancel' }]] };
    bot.sendMessage(chatId, `⚠️ Подтвердите:\n\n📝 ${name}\n📂 ${category}\n📄 ${filename}`, { reply_markup: keyboard });
    return;
  }
  
  // Certificate edit: step 21 (name) → step 24 (confirm)
  if (state.mode === 'edit_certificates' && state.step === 21) {
    const { index, category, filename } = state.tempData || {};
    setUserState(userId, { ...state, step: 24, tempData: { index, name: text, category, filename } });
    const keyboard = { inline_keyboard: [[{ text: '✏️ Название', callback_data: 'cert_edit_name' }, { text: '📂 Категория', callback_data: 'cert_edit_category' }], [{ text: '↩️ Назад', callback_data: 'back' }, { text: '✅ Сохранить', callback_data: 'cert_confirm_edit' }]] };
    bot.sendMessage(chatId, `⚠️ Подтвердите:\n\n📝 ${text}`, { reply_markup: keyboard });
    return;
  }
  
  // Certificate edit: step 22 (category) → step 24 (confirm)
  if (state.mode === 'edit_certificates' && state.step === 22) {
    const { index, name, filename } = state.tempData || {};
    const categoryMap: Record<string, string> = {
      '1': 'sro', '2': 'iso', '3': 'fire', '4': 'windows', '5': 'facade', '6': 'doors', '7': 'glass-partitions', '8': 'other'
    };
    const category = text && categoryMap[text] ? categoryMap[text] : 'other';
    setUserState(userId, { ...state, step: 24, tempData: { index, name, category, filename } });
    const categoryNames: Record<string, string> = {
      'sro': 'Допуски СРО', 'iso': 'ISO', 'fire': 'Пожарная безопасность',
      'windows': 'Окна', 'facade': 'Витражи и фасады', 'doors': 'Двери', 'glass-partitions': 'Внутренние стеклянные перегородки', 'other': 'Прочие'
    };
    const keyboard = { inline_keyboard: [[{ text: '✏️ Название', callback_data: 'cert_edit_name' }, { text: '📂 Категория', callback_data: 'cert_edit_category' }], [{ text: '↩️ Назад', callback_data: 'back' }, { text: '✅ Сохранить', callback_data: 'cert_confirm_edit' }]] };
    bot.sendMessage(chatId, `⚠️ Подтвердите:\n\n📝 ${name}\n📂 ${categoryNames[category]}`, { reply_markup: keyboard });
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
