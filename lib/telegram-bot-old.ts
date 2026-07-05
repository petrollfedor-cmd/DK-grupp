import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';

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

// State management for each admin
interface UserState {
  mode: 'idle' | 'edit_navigation' | 'edit_hero' | 'edit_projects' | 'edit_footer';
  step: number;
  tempData: any;
}

const userStates: Map<number, UserState> = new Map();

export function getUserState(userId: number): UserState {
  if (!userStates.has(userId)) {
    userStates.set(userId, {
      mode: 'idle',
      step: 0,
      tempData: null
    });
  }
  return userStates.get(userId)!;
}

export function setUserState(userId: number, state: UserState): void {
  userStates.set(userId, state);
}

export function clearUserState(userId: number): void {
  userStates.set(userId, {
    mode: 'idle',
    step: 0,
    tempData: null
  });
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
        [
          { text: '📋 Навигация', callback_data: 'edit_navigation' },
          { text: '🖼 Hero секция', callback_data: 'edit_hero' }
        ],
        [
          { text: '🏗 Проекты', callback_data: 'edit_projects' },
          { text: '📎 Футер', callback_data: 'edit_footer' }
        ],
        [
          { text: '📊 Статистика', callback_data: 'stats' }
        ]
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
    bot.answerCallbackQuery(query.id, { text: '⛔ Доступ запрещен' });
    return;
  }
  
  bot.answerCallbackQuery(query.id);
  
  const chatId = query.message?.chat.id;
  if (!chatId) return;
  
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
        ]).concat([
          [{ text: '↩️ Назад', callback_data: 'back' }]
        ])
      };
      bot.sendMessage(chatId, 'Выберите пункт для редактирования:', { reply_markup: keyboard });
      break;
    }
    case 'nav_edit_item_0':
    case 'nav_edit_item_1':
    case 'nav_edit_item_2':
    case 'nav_edit_item_3':
    case 'nav_edit_item_4':
    case 'nav_edit_item_5':
    case 'nav_edit_item_6':
    case 'nav_edit_item_7':
    case 'nav_edit_item_8':
    case 'nav_edit_item_9': {
      const itemIndex = parseInt(data.split('_')[3]);
      showNavigationItemEdit(userId, chatId, itemIndex);
      break;
    }
    case 'nav_item_name':
    case 'nav_item_name_0':
    case 'nav_item_name_1':
    case 'nav_item_name_2':
    case 'nav_item_name_3':
    case 'nav_item_name_4':
    case 'nav_item_name_5':
    case 'nav_item_name_6':
    case 'nav_item_name_7':
    case 'nav_item_name_8':
    case 'nav_item_name_9': {
      const itemIndex = parseInt(data.split('_').pop()!);
      setUserState(userId, { mode: 'edit_navigation', step: 10, tempData: { index: itemIndex, type: 'name' } });
      const { getAllContent } = require('./content');
      const content = getAllContent();
      const item = content.navigation[itemIndex];
      bot.sendMessage(chatId, `✏️ Название\n\nТекущее: ${item.label}\n\nНапишите новое название:`, {
        reply_markup: { force_reply: true }
      });
      break;
    }
    case 'nav_item_href': {
      const itemIndex = parseInt(data.split('_')[3]);
      setUserState(userId, { mode: 'edit_navigation', step: 10, tempData: { index: itemIndex, type: 'href' } });
      const { getAllContent } = require('./content');
      const content = getAllContent();
      const item = content.navigation[itemIndex];
      bot.sendMessage(chatId, `🔗 Ссылка\n\nТекущая: ${item.href}\n\nНапишите новую ссылку:`, {
        reply_markup: { force_reply: true }
      });
      break;
    }
    case 'confirm_nav_item': {
      const state = getUserState(userId);
      if (state.mode === 'edit_navigation' && state.step === 11 && state.tempData) {
        const { index, type, value } = state.tempData;
        const { getAllContent, updateNavigation } = require('./content');
        const content = getAllContent();
        
        if (type === 'name') {
          content.navigation[index].label = value;
        } else if (type === 'href') {
          content.navigation[index].href = value;
        }
        
        updateNavigation(content.navigation);
        
        const mainKeyboard = {
          inline_keyboard: [
            [
              { text: '🏠 Главное меню', callback_data: 'back' },
              { text: '📋 Навигация', callback_data: 'edit_navigation' }
            ]
          ]
        };
        
        bot.sendMessage(chatId, `✅ ${type === 'name' ? 'Название' : 'Ссылка'} обновлена!`, { reply_markup: mainKeyboard });
      }
      clearUserState(userId);
      break;
    }
    case 'cancel_nav_item': {
      const state = getUserState(userId);
      const itemIndex = state.tempData?.index;
      if (itemIndex !== undefined) {
        showNavigationItemEdit(userId, chatId, itemIndex);
      } else {
        bot.sendMessage(chatId, '❌ Отменено.');
        clearUserState(userId);
      }
      break;
    }
    case 'edit_hero':
      handleEditHero(userId, chatId);
      break;
    case 'hero_title':
      startEditHeroTitle(userId, chatId);
      break;
    case 'hero_desc':
      startEditHeroDesc(userId, chatId);
      break;
    case 'hero_image':
      startEditHeroImage(userId, chatId);
      break;
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
        
        const mainKeyboard = {
          inline_keyboard: [
            [{ text: '🏠 Главное меню', callback_data: 'back' }]
          ]
        };
        
        bot.sendMessage(chatId, '✅ Заголовок обновлен!', { reply_markup: mainKeyboard });
      }
      clearUserState(userId);
      break;
    }
    case 'cancel_hero_title': {
      bot.sendMessage(chatId, '❌ Отменено. Изменения не сохранены.');
      clearUserState(userId);
      break;
    }
    case 'confirm_hero_desc': {
      const state = getUserState(userId);
      if (state.mode === 'edit_hero' && state.step === 4 && state.tempData) {
        const { getAllContent, updateHero } = require('./content');
        const content = getAllContent();
        content.hero.description = state.tempData;
        updateHero(content.hero);
        
        const mainKeyboard = {
          inline_keyboard: [
            [{ text: '🏠 Главное меню', callback_data: 'back' }]
          ]
        };
        
        bot.sendMessage(chatId, '✅ Описание обновлено!', { reply_markup: mainKeyboard });
      }
      clearUserState(userId);
      break;
    }
    case 'cancel_hero_desc': {
      bot.sendMessage(chatId, '❌ Отменено. Изменения не сохранены.');
      clearUserState(userId);
      break;
    }
    case 'confirm_hero_image': {
      const state = getUserState(userId);
      if (state.mode === 'edit_hero' && state.step === 6 && state.tempData) {
        const { getAllContent, updateHero } = require('./content');
        const content = getAllContent();
        content.hero.imageUrl = state.tempData;
        updateHero(content.hero);
        
        const mainKeyboard = {
          inline_keyboard: [
            [{ text: '🏠 Главное меню', callback_data: 'back' }]
          ]
        };
        
        bot.sendMessage(chatId, '✅ Фото обновлено!', { reply_markup: mainKeyboard });
      }
      clearUserState(userId);
      break;
    }
    case 'cancel_hero_image': {
      bot.sendMessage(chatId, '❌ Отменено. Изменения не сохранены.');
      clearUserState(userId);
      break;
    }
    case 'edit_projects':
      handleEditProjects(userId, chatId);
      break;
    case 'proj_edit':
      handleEditProjectsList(userId, chatId);
      break;
    case 'proj_add':
      setUserState(userId, { mode: 'edit_projects', step: 10, tempData: null });
      const nameKeyboard = {
        inline_keyboard: [
          [{ text: '↩️ Назад', callback_data: 'back' }]
        ]
      };
      bot.sendMessage(chatId, '✍️ Введите название проекта:', { reply_markup: nameKeyboard });
      break;
    case 'proj_delete':
      startDeleteProject(userId, chatId);
      break;
    case 'proj_edit_item_0':
    case 'proj_edit_item_1':
    case 'proj_edit_item_2':
    case 'proj_edit_item_3':
    case 'proj_edit_item_4':
    case 'proj_edit_item_5':
    case 'proj_edit_item_6':
    case 'proj_edit_item_7':
    case 'proj_edit_item_8':
    case 'proj_edit_item_9': {
      const itemIndex = parseInt(data.split('_').pop()!);
      showProjectEditMenu(userId, chatId, itemIndex);
      break;
    }
    case 'proj_edit_name': {
      const state = getUserState(userId);
      if (state.mode === 'edit_projects' && state.step === 20) {
        setUserState(userId, { ...state, step: 21, tempData: state.tempData });
        bot.sendMessage(chatId, '✍️ Введите новое название:');
      }
      break;
    }
    case 'proj_edit_desc': {
      const state = getUserState(userId);
      if (state.mode === 'edit_projects' && state.step === 20) {
        setUserState(userId, { ...state, step: 22, tempData: state.tempData });
        const descKeyboard = {
          inline_keyboard: [
            [{ text: '↩️ Назад', callback_data: 'back' }]
          ]
        };
        bot.sendMessage(chatId, '✍️ Введите новое описание через запятую:', { reply_markup: descKeyboard });
      }
      break;
    }
    case 'proj_edit_image': {
      const state = getUserState(userId);
      if (state.mode === 'edit_projects' && state.step === 20) {
        setUserState(userId, { ...state, step: 23, tempData: state.tempData });
        bot.sendMessage(chatId,
          '📸 Отправьте новое фото (как изображение),\n' +
          'или введите новый путь к фото:',
          { reply_markup: { force_reply: true } }
        );
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
        bot.sendMessage(chatId, '✅ Проект обновлён!');
      }
      clearUserState(userId);
      break;
    }
    case 'proj_cancel_edit': {
      const state = getUserState(userId);
      if (state.mode === 'edit_projects' && (state.step === 20 || state.step === 24)) {
        const index = state.tempData?.index;
        if (index !== undefined) {
          showProjectEditMenu(userId, chatId, index);
        } else {
          bot.sendMessage(chatId, '❌ Отменено.');
          clearUserState(userId);
        }
      }
      break;
    }
    case 'proj_delete_item_0':
    case 'proj_delete_item_1':
    case 'proj_delete_item_2':
    case 'proj_delete_item_3':
    case 'proj_delete_item_4':
    case 'proj_delete_item_5':
    case 'proj_delete_item_6':
    case 'proj_delete_item_7':
    case 'proj_delete_item_8':
    case 'proj_delete_item_9': {
      const itemIndex = parseInt(data.split('_').pop()!);
      const { getAllContent } = require('./content');
      const content = getAllContent();
      const project = content.projects[itemIndex];
      
      setUserState(userId, { mode: 'edit_projects', step: 12, tempData: itemIndex });
      
      const keyboard = {
        inline_keyboard: [
          [
            { text: '✅ Удалить', callback_data: 'confirm_delete_project' }
          ],
          [
            { text: '↩️ Назад', callback_data: 'back' }
          ]
        ]
      };
      
      bot.sendMessage(chatId,
        `🗑 Удалить проект?\n\n` +
        `📝 ${project.title}\n` +
        `📄 ${project.description}`,
        { reply_markup: keyboard }
      );
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
          return {
            id: content.projects[index]?.id || index + 1,
            title: title || 'Без названия',
            description: description || '',
            image: image || '/figma/default.png',
            icon: image || '/figma/default.png',
            maxHeight: 280
          };
        });
        updateProjects(newProjects);
        
        const mainKeyboard = {
          inline_keyboard: [
            [{ text: '🏠 Главное меню', callback_data: 'back' }]
          ]
        };
        
        bot.sendMessage(chatId, `✅ Проекты обновлены! ${newProjects.length} проектов.`, { reply_markup: mainKeyboard });
      }
      clearUserState(userId);
      break;
    }
    case 'cancel_projects': {
      bot.sendMessage(chatId, '❌ Отменено. Изменения не сохранены.');
      clearUserState(userId);
      break;
    }
    case 'confirm_add_project': {
      const state = getUserState(userId);
      if (state.mode === 'edit_projects' && state.step === 13 && state.tempData) {
        const { title, description, image } = state.tempData;
        const { addProject } = require('./content');
        addProject({ title, description, image });
        
        const mainKeyboard = {
          inline_keyboard: [
            [{ text: '🏠 Главное меню', callback_data: 'back' }]
          ]
        };
        
        bot.sendMessage(chatId, '✅ Проект добавлен!', { reply_markup: mainKeyboard });
      }
      clearUserState(userId);
      break;
    }
    case 'cancel_add_project': {
      bot.sendMessage(chatId, '❌ Отменено.');
      clearUserState(userId);
      break;
    }
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
        const descKeyboard = {
          inline_keyboard: [
            [{ text: '↩️ Назад', callback_data: 'back' }]
          ]
        };
        bot.sendMessage(chatId, '✍️ Введите новое описание через запятую:', { reply_markup: descKeyboard });
      }
      break;
    }
    case 'edit_add_image': {
      const state = getUserState(userId);
      if (state.mode === 'edit_projects' && state.step === 13) {
        setUserState(userId, { ...state, step: 16, tempData: state.tempData });
        bot.sendMessage(chatId,
          '📸 Отправьте новое фото (как изображение),\n' +
          'или введите новый путь к фото:',
          { reply_markup: { force_reply: true } }
        );
      }
      break;
    }
      break;
    }
    case 'edit_add_desc': {
      const state = getUserState(userId);
      if (state.mode === 'edit_projects' && state.step === 13) {
        setUserState(userId, { ...state, step: 15, tempData: state.tempData });
        const descKeyboard = {
          inline_keyboard: [
            [{ text: '↩️ Назад', callback_data: 'back' }]
          ]
        };
        bot.sendMessage(chatId, '✍️ Введите новое описание через запятую:', { reply_markup: descKeyboard });
      }
      break;
    }
    case 'edit_add_image': {
      const state = getUserState(userId);
      if (state.mode === 'edit_projects' && state.step === 13) {
        setUserState(userId, { ...state, step: 16, tempData: state.tempData });
        bot.sendMessage(chatId,
          '📸 Отправьте новое фото (как изображение),\n' +
          'или введите новый путь к фото:',
          { reply_markup: { force_reply: true } }
        );
      }
      break;
    }
      break;
    }
    case 'edit_add_desc': {
      const state = getUserState(userId);
      if (state.mode === 'edit_projects' && state.step === 13) {
        setUserState(userId, { ...state, step: 11, tempData: state.tempData });
        bot.sendMessage(chatId, '✍️ Введите новое описание через запятую:');
      }
      break;
    }
    case 'edit_add_image': {
      const state = getUserState(userId);
      if (state.mode === 'edit_projects' && state.step === 13) {
        setUserState(userId, { ...state, step: 12, tempData: state.tempData });
        bot.sendMessage(chatId,
          '📸 Отправьте новое фото (как изображение),\n' +
          'или введите новый путь к фото:',
          { reply_markup: { force_reply: true } }
        );
      }
      break;
    }
    case 'edit_add_title': {
      const state = getUserState(userId);
      if (state.mode === 'edit_projects' && state.step === 13 && state.tempData) {
        setUserState(userId, { ...state, step: 14, tempData: { ...state.tempData, editing: 'title' } });
        bot.sendMessage(chatId, '✍️ Введите новое название:', {
          reply_markup: { inline_keyboard: [[{ text: '↩️ Назад', callback_data: 'back' }]] }
        });
      }
      break;
    }
    case 'edit_add_desc': {
      const state = getUserState(userId);
      if (state.mode === 'edit_projects' && state.step === 13 && state.tempData) {
        setUserState(userId, { ...state, step: 14, tempData: { ...state.tempData, editing: 'description' } });
        bot.sendMessage(chatId, '✍️ Введите новое описание через запятую:', {
          reply_markup: { inline_keyboard: [[{ text: '↩️ Назад', callback_data: 'back' }]] }
        });
      }
      break;
    }
    case 'edit_add_image': {
      const state = getUserState(userId);
      if (state.mode === 'edit_projects' && state.step === 13 && state.tempData) {
        setUserState(userId, { ...state, step: 14, tempData: { ...state.tempData, editing: 'image' } });
        bot.sendMessage(chatId, '📸 Отправьте фото или введите путь к нему:', {
          reply_markup: { inline_keyboard: [[{ text: '↩️ Назад', callback_data: 'back' }]] }
        });
      }
      break;
    }
    case 'confirm_edit_field': {
      const state = getUserState(userId);
      if (state.mode === 'edit_projects' && state.step === 14 && state.tempData && state.tempData.editing && text) {
        const { editing, ...rest } = state.tempData;
        const updatedData = { ...rest, [editing]: text };
        setUserState(userId, { ...state, step: 13, tempData: updatedData });
        
        const { title, description, image } = updatedData;
        const keyboard = {
          inline_keyboard: [
            [
              { text: '✏️ Название', callback_data: 'edit_add_title' },
              { text: '✏️ Описание', callback_data: 'edit_add_desc' }
            ],
            [
              { text: '✏️ Фото', callback_data: 'edit_add_image' },
              { text: '↩️ Назад', callback_data: 'back' }
            ],
            [
              { text: '✅ Сохранить', callback_data: 'confirm_add_project' }
            ]
          ]
        };
        
        bot.sendMessage(chatId,
          '⚠️ *Подтвердите добавление проекта:*\n\n' +
          '📝 *Название:* ' + title + '\n' +
          '📄 *Описание:*\n' + description.split(',').map((item: string) => '• ' + item.trim()).join('\n') + '\n' +
          '🖼 *Фото:* ' + image,
          { reply_markup: keyboard }
        );
      }
      break;
    }
    case 'confirm_delete_project': {
      const state = getUserState(userId);
      if (state.mode === 'edit_projects' && state.step === 12 && state.tempData !== null) {
        const { deleteProject } = require('./content');
        deleteProject(state.tempData);
        
        const mainKeyboard = {
          inline_keyboard: [
            [{ text: '🏠 Главное меню', callback_data: 'back' }]
          ]
        };
        
        bot.sendMessage(chatId, '✅ Проект удалён!', { reply_markup: mainKeyboard });
      }
      clearUserState(userId);
      break;
    }
    case 'cancel_delete_project': {
      bot.sendMessage(chatId, '❌ Отменено.');
      clearUserState(userId);
      break;
    }
    case 'edit_footer':
      handleEditFooter(userId, chatId);
      break;
    case 'footer_contacts':
      startEditFooterContacts(userId, chatId);
      break;
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
        content.footer.contacts = {
          phone: phone || content.footer.contacts.phone,
          email: email || content.footer.contacts.email,
          phoneHref: phoneHref || content.footer.contacts.phoneHref,
          emailHref: emailHref || content.footer.contacts.emailHref
        };
        updateFooter(content.footer);
        
        const mainKeyboard = {
          inline_keyboard: [
            [{ text: '🏠 Главное меню', callback_data: 'back' }]
          ]
        };
        
        bot.sendMessage(chatId, '✅ Контакты обновлены!', { reply_markup: mainKeyboard });
      }
      clearUserState(userId);
      break;
    }
    case 'cancel_footer_contacts': {
      bot.sendMessage(chatId, '❌ Отменено. Изменения не сохранены.');
      clearUserState(userId);
      break;
    }
    case 'stats':
      handleStats(userId, chatId);
      break;
    case 'back':
      clearUserState(userId);
      const mainKeyboard = {
        inline_keyboard: [
          [
            { text: '📋 Навигация', callback_data: 'edit_navigation' },
            { text: '🖼 Hero секция', callback_data: 'edit_hero' }
          ],
          [
            { text: '🏗 Проекты', callback_data: 'edit_projects' },
            { text: '📎 Футер', callback_data: 'edit_footer' }
          ],
          [
            { text: '📊 Статистика', callback_data: 'stats' }
          ]
        ]
      };
      bot.sendMessage(chatId, '👋 Вы вернулись в главное меню.\n\nВыберите раздел для редактирования:', {
        reply_markup: mainKeyboard
      });
      break;
  }
});

async function handleEditNavigation(userId: number, chatId?: number) {
  if (!chatId) return;
  
  const { getAllContent } = require('./content');
  const content = getAllContent();
  
  const message = '📋 Текущая навигация:\n\n';
  const items = content.navigation.map((item: any, index: number) => 
    `${index + 1}. ${item.label} → ${item.href}`
  ).join('\n');
  
  const keyboard = {
    inline_keyboard: [
      [
        { text: '✏️ Редактировать', callback_data: 'nav_edit' },
        { text: '↩️ Назад', callback_data: 'back' }
      ]
    ]
  };
  
  bot.sendMessage(chatId, message + items, { reply_markup: keyboard });
  
  setUserState(userId, { mode: 'edit_navigation', step: 0, tempData: null });
}

function showNavigationItemEdit(userId: number, chatId: number, itemIndex: number) {
  const { getAllContent } = require('./content');
  const content = getAllContent();
  const item = content.navigation[itemIndex];
  
  const keyboard = {
    inline_keyboard: [
      [
        { text: '✏️ Изменить название', callback_data: `nav_item_name_${itemIndex}` }
      ],
      [
        { text: '↩️ Назад', callback_data: 'back' }
      ]
    ]
  };
  
  bot.sendMessage(chatId,
    `📌 Редактирование пункта:\n\n` +
    `📝 Название: ${item.label}\n` +
    `🔗 Ссылка: ${item.href}\n\n` +
    `Нажмите "Изменить название" для редактирования:`,
    { reply_markup: keyboard }
  );
}

async function handleEditHero(userId: number, chatId?: number) {
  if (!chatId) return;
  
  const { getAllContent } = require('./content');
  const content = getAllContent();
  
  let message = '🖼 *Hero секция:*\n\n';
  message += `📝 Заголовок: ${content.hero.title}\n`;
  message += `📄 Описание: ${content.hero.description}\n`;
  message += `🎯 Главный заголовок: ${content.hero.mainTitle}\n`;
  
  const keyboard = {
      inline_keyboard: [
        [
          { text: '✏️ Изменить заголовок', callback_data: 'hero_title' },
          { text: '📝 Изменить описание', callback_data: 'hero_desc' }
        ],
        [
          { text: '🖼 Изменить фото', callback_data: 'hero_image' },
          { text: '↩️ Назад', callback_data: 'back' }
        ]
      ]
    };
    
  bot.sendMessage(chatId, message, { reply_markup: keyboard });
  
  setUserState(userId, { mode: 'edit_hero', step: 0, tempData: null });
}

function startEditHeroTitle(userId: number, chatId: number) {
  const { getAllContent } = require('./content');
  const content = getAllContent();
  
  const keyboard = {
    inline_keyboard: [
      [
        { text: '✏️ Изменить', callback_data: 'hero_change_title' },
        { text: '↩️ Назад', callback_data: 'back' }
      ]
    ]
  };
  
  bot.sendMessage(chatId,
    '📝 *Текущее значение:*\n' +
    '```\n' + content.hero.title + '\n```\n',
    { reply_markup: keyboard }
  );
  
  setUserState(userId, { mode: 'edit_hero', step: 0, tempData: null });
}

function startEditHeroDesc(userId: number, chatId: number) {
  const { getAllContent } = require('./content');
  const content = getAllContent();
  
  const keyboard = {
    inline_keyboard: [
      [
        { text: '✏️ Изменить', callback_data: 'hero_change_desc' },
        { text: '↩️ Назад', callback_data: 'back' }
      ]
    ]
  };
  
  bot.sendMessage(chatId,
    '📄 *Текущее значение:*\n' +
    '```\n' + content.hero.description + '\n```\n',
    { reply_markup: keyboard }
  );
  
  setUserState(userId, { mode: 'edit_hero', step: 0, tempData: null });
}

function startEditHeroImage(userId: number, chatId: number) {
  const { getAllContent } = require('./content');
  const content = getAllContent();
  
  const keyboard = {
    inline_keyboard: [
      [
        { text: '✏️ Изменить', callback_data: 'hero_change_image' },
        { text: '↩️ Назад', callback_data: 'back' }
      ]
    ]
  };
  
  bot.sendMessage(chatId,
    '🖼 *Текущее значение:*\n' +
    '```\n' + content.hero.imageUrl + '\n```\n',
    { reply_markup: keyboard }
  );
  
  setUserState(userId, { mode: 'edit_hero', step: 0, tempData: null });
}

async function handleEditProjects(userId: number, chatId?: number) {
  if (!chatId) return;
  
  const { getAllContent } = require('./content');
  const content = getAllContent();
  
  let message = '🏗 *Проекты:*\n\n';
  message += `Всего проектов: ${content.projects.length}\n\n`;
  
  const projects = content.projects.map((p: any, i: number) => 
    `${i + 1}. ${p.title}`
  ).join('\n');
  
  const keyboard = {
    inline_keyboard: [
      [
        { text: '➕ Добавить', callback_data: 'proj_add' },
        { text: '🗑 Удалить', callback_data: 'proj_delete' }
      ]
    ].concat(
      content.projects.map((p: any, i: number) => [
        { text: `✏️ ${i + 1}. ${p.title}`, callback_data: `proj_edit_item_${i}` }
      ])
    ).concat([
      [{ text: '↩️ Назад', callback_data: 'back' }]
    ])
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
  
  if (content.projects.length === 0) {
    bot.sendMessage(chatId, '❌ Нет проектов для удаления.');
    return;
  }
  
  const keyboard = {
    inline_keyboard: content.projects.map((p: any, i: number) => [
      { text: `🗑 ${i + 1}. ${p.title}`, callback_data: `proj_delete_item_${i}` }
    ]).concat([
      [{ text: '↩️ Назад', callback_data: 'back' }]
    ])
  };
  
  bot.sendMessage(chatId, '🗑 Выберите проект для удаления:', { reply_markup: keyboard });
}

function showProjectEditMenu(userId: number, chatId: number, index: number) {
  const { getAllContent } = require('./content');
  const content = getAllContent();
  const project = content.projects[index];
  
  setUserState(userId, { mode: 'edit_projects', step: 20, tempData: { index } });
  
  const keyboard = {
    inline_keyboard: [
      [
        { text: '✏️ Название', callback_data: 'proj_edit_name' },
        { text: '📝 Описание', callback_data: 'proj_edit_desc' }
      ],
      [
        { text: '🖼 Фото', callback_data: 'proj_edit_image' }
      ],
      [
        { text: '↩️ Назад', callback_data: 'back' }
      ]
    ]
  };
  
  bot.sendMessage(chatId,
    `✏️ Редактирование проекта:\n\n` +
    `📝 Название: ${project.title}\n` +
    `📄 Описание: ${project.description}\n` +
    `🖼 Фото: ${project.image}`,
    { reply_markup: keyboard }
  );
}

function showProjectConfirm(userId: number, chatId: number, data: any) {
  const keyboard = {
    inline_keyboard: [
      [
        { text: '✏️ Название', callback_data: 'proj_edit_name' },
        { text: '📝 Описание', callback_data: 'proj_edit_desc' }
      ],
      [
        { text: '🖼 Фото', callback_data: 'proj_edit_image' }
      ],
      [
        { text: '↩️ Назад', callback_data: 'proj_cancel_edit' },
        { text: '✅ Сохранить', callback_data: 'proj_confirm_edit' }
      ]
    ]
  };
  
  bot.sendMessage(chatId,
    '⚠️ *Подтвердите изменения:*\n\n' +
    '📝 *Название:* ' + (data.title || '—') + '\n' +
    '📄 *Описание:*\n' + (data.description ? data.description.split(',').map((item: string) => '• ' + item.trim()).join('\n') : '—') + '\n' +
    '🖼 *Фото:* ' + (data.image || '—'),
    { reply_markup: keyboard }
  );
}

function startEditProjects(userId: number, chatId: number) {
  const { getAllContent } = require('./content');
  const content = getAllContent();
  const current = content.projects.map((p: any) => `${p.title}|${p.description}|${p.image}`).join('\n');
  
  const keyboard = {
    inline_keyboard: [
      [
        { text: '✏️ Изменить', callback_data: 'proj_change' },
        { text: '↩️ Назад', callback_data: 'back' }
      ]
    ]
  };
  
  bot.sendMessage(chatId,
    '🏗 *Текущие проекты:*\n\n' +
    '```\n' + current + '\n```\n\n' +
    '📌 *Формат: title|description|image*\n' +
    'Пример:\n' +
    'Проект 1|Описание 1|/path/to/image.png',
    { reply_markup: keyboard }
  );
  
  setUserState(userId, { mode: 'edit_projects', step: 0, tempData: null });
}

async function handleEditFooter(userId: number, chatId?: number) {
  if (!chatId) return;
  
  const { getAllContent } = require('./content');
  const content = getAllContent();
  
  let message = '📎 *Футер:*\n\n';
  message += `📞 Телефон: ${content.footer.contacts.phone}\n`;
  message += `📧 Email: ${content.footer.contacts.email}\n`;
  message += `📄 Документы: ${content.footer.documents.length} шт.\n`;
  
  const keyboard = {
    inline_keyboard: [
      [
        { text: '✏️ Контакты', callback_data: 'footer_contacts' },
        { text: '📄 Документы', callback_data: 'footer_docs' }
      ],
      [
        { text: '👥 Партнёры', callback_data: 'footer_partners' },
        { text: '↩️ Назад', callback_data: 'back' }
      ]
    ]
  };
  
  bot.sendMessage(chatId, message, { reply_markup: keyboard });
  
  setUserState(userId, { mode: 'edit_footer', step: 0, tempData: null });
}

function startEditFooterContacts(userId: number, chatId: number) {
  const { getAllContent } = require('./content');
  const content = getAllContent();
  
  const keyboard = {
    inline_keyboard: [
      [
        { text: '✏️ Изменить', callback_data: 'footer_change_contacts' },
        { text: '↩️ Назад', callback_data: 'back' }
      ]
    ]
  };
  
  bot.sendMessage(chatId,
    '📞 *Текущие контакты:*\n\n' +
    '```\n' +
    `Телефон: ${content.footer.contacts.phone}\n` +
    `Email: ${content.footer.contacts.email}\n` +
    `Телефон href: ${content.footer.contacts.phoneHref}\n` +
    `Email href: ${content.footer.contacts.emailHref}\n` +
    '```\n\n' +
    '📌 *Формат: phone|email|phoneHref|emailHref*\n' +
    'Пример:\n' +
    '+7 (999) 999-99-99|info@site.ru|tel:+79999999999|mailto:info@site.ru',
    { reply_markup: keyboard }
  );
  
  setUserState(userId, { mode: 'edit_footer', step: 0, tempData: null });
}

async function handleStats(userId: number, chatId?: number) {
  if (!chatId) return;
  
  const { getAllContent } = require('./content');
  const content = getAllContent();
  
  let message = `📊 *Статистика сайта:*\n\n`;
  message += `📋 Пунктов навигации: ${content.navigation.length}\n`;
  message += `🏗 Проектов: ${content.projects.length}\n`;
  message += `📄 Документов: ${content.footer.documents.length}\n`;
  message += `👥 Партнёров: ${content.footer.partners.length}\n`;
  
  bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
}

// Message handler for text input
bot.on('message', async (msg) => {
  const userId = msg.from?.id;
  const chatId = msg.chat.id;
  const text = msg.text;
  
  if (!userId || !chatId) return;
  
  const state = getUserState(userId);
  
  if (state.mode === 'idle') return;
  
  // Handle adding new project - step 10: name input → ask description
  if (state.mode === 'edit_projects' && state.step === 10) {
    setUserState(userId, { ...state, step: 11, tempData: { title: text } });
    const descKeyboard = {
      inline_keyboard: [
        [{ text: '↩️ Назад', callback_data: 'back' }]
      ]
    };
    bot.sendMessage(chatId, '✍️ Введите описание через запятую:\n\nПроектирование, Установка конструкций, Монтаж', { reply_markup: descKeyboard });
    return;
  }
  
  // Handle adding new project - step 11: description input → ask for photo
  if (state.mode === 'edit_projects' && state.step === 11) {
    setUserState(userId, { ...state, step: 12, tempData: { ...state.tempData, description: text } });
    const photoKeyboard = {
      inline_keyboard: [
        [{ text: '↩️ Назад', callback_data: 'back' }]
      ]
    };
    bot.sendMessage(chatId,
      '📸 Отправьте фото проекта (как изображение),\n' +
      'или введите путь к фото (например: /figma/new-project.png)',
      { reply_markup: photoKeyboard }
    );
    return;
  }
  
  // Handle adding new project - step 10: name input → ask description
  if (state.mode === 'edit_projects' && state.step === 10) {
    setUserState(userId, { ...state, step: 11, tempData: { title: text } });
    const descKeyboard = {
      inline_keyboard: [
        [{ text: '↩️ Назад', callback_data: 'back' }]
      ]
    };
    bot.sendMessage(chatId, '✍️ Введите описание через запятую:\n\nПроектирование, Установка конструкций, Монтаж', { reply_markup: descKeyboard });
    return;
  }
  
  // Handle adding new project - step 11: description input → ask for photo
  if (state.mode === 'edit_projects' && state.step === 11) {
    setUserState(userId, { ...state, step: 12, tempData: { ...state.tempData, description: text } });
    const photoKeyboard = {
      inline_keyboard: [
        [{ text: '↩️ Назад', callback_data: 'back' }]
      ]
    };
    bot.sendMessage(chatId,
      '📸 Отправьте фото проекта (как изображение),\n' +
      'или введите путь к фото (например: /figma/new-project.png)',
      { reply_markup: photoKeyboard }
    );
    return;
  }
  
  // Handle adding new project - step 10: name input → ask description
  if (state.mode === 'edit_projects' && state.step === 10) {
    setUserState(userId, { ...state, step: 11, tempData: { title: text } });
    const descKeyboard = {
      inline_keyboard: [
        [{ text: '↩️ Назад', callback_data: 'back' }]
      ]
    };
    bot.sendMessage(chatId, '✍️ Введите описание через запятую:\n\nПроектирование, Установка конструкций, Монтаж', { reply_markup: descKeyboard });
    return;
  }
  
  // Handle adding new project - step 11: description input → ask for photo
  if (state.mode === 'edit_projects' && state.step === 11) {
    setUserState(userId, { ...state, step: 12, tempData: { ...state.tempData, description: text } });
    const photoKeyboard = {
      inline_keyboard: [
        [{ text: '↩️ Назад', callback_data: 'back' }]
      ]
    };
    bot.sendMessage(chatId,
      '📸 Отправьте фото проекта (как изображение),\n' +
      'или введите путь к фото (например: /figma/new-project.png)',
      { reply_markup: photoKeyboard }
    );
    return;
  }
  
  // Handle adding new project - step 10: name input → ask description
  if (state.mode === 'edit_projects' && state.step === 10) {
    const { title, description, image } = state.tempData || {};
    const newTitle = text;
    setUserState(userId, { ...state, step: 11, tempData: { title: newTitle, description, image } });
    const descKeyboard = {
      inline_keyboard: [
        [{ text: '↩️ Назад', callback_data: 'back' }]
      ]
    };
    bot.sendMessage(chatId, '✍️ Введите описание через запятую:\n\nПроектирование, Установка конструкций, Монтаж', { reply_markup: descKeyboard });
    return;
  }
  
  // Handle adding new project - step 11: description input → ask for photo
  if (state.mode === 'edit_projects' && state.step === 11) {
    const { title, description, image } = state.tempData || {};
    setUserState(userId, { ...state, step: 12, tempData: { title, description: text, image } });
    const photoKeyboard = {
      inline_keyboard: [
        [{ text: '↩️ Назад', callback_data: 'back' }]
      ]
    };
    bot.sendMessage(chatId,
      '📸 Отправьте фото проекта (как изображение),\n' +
      'или введите путь к фото (например: /figma/new-project.png)',
      { reply_markup: photoKeyboard }
    );
    return;
  }
  
  // Handle adding new project - step 12: photo input → confirm
  if (state.mode === 'edit_projects' && state.step === 12) {
    const { title, description, image: oldImage } = state.tempData || {};
    let imagePath = text || oldImage || '/figma/default.png';
    
    // Если прислали фото как вложение
    const photo = msg.photo?.[msg.photo.length - 1];
    if (photo) {
      const fileId = photo.file_id;
      const filename = `project_${Date.now()}.png`;
      const downloadPath = path.join(process.cwd(), 'public', 'figma', filename);
      
      const fileStream = bot.getFileStream(fileId);
      await new Promise((resolve, reject) => {
        fileStream.on('error', reject);
        fileStream.pipe(fs.createWriteStream(downloadPath));
        fileStream.on('end', resolve);
      });
      
      imagePath = `/figma/${filename}`;
    }
    
    setUserState(userId, { ...state, step: 13, tempData: { title, description, image: imagePath } });
    
    const keyboard = {
      inline_keyboard: [
        [
          { text: '✏️ Название', callback_data: 'edit_add_title' },
          { text: '✏️ Описание', callback_data: 'edit_add_desc' }
        ],
        [
          { text: '✏️ Фото', callback_data: 'edit_add_image' },
          { text: '↩️ Назад', callback_data: 'back' }
        ],
        [
          { text: '✅ Сохранить', callback_data: 'confirm_add_project' }
        ]
      ]
    };
    
    bot.sendMessage(chatId,
      '⚠️ *Подтвердите добавление проекта:*\n\n' +
      '📝 *Название:* ' + title + '\n' +
      '📄 *Описание:*\n' + description.split(',').map((item: string) => '• ' + item.trim()).join('\n') + '\n' +
      '🖼 *Фото:* ' + imagePath,
      { reply_markup: keyboard }
    );
    return;
  }
  
  // Edit title from confirmation (step 14) → go back to confirmation
  if (state.mode === 'edit_projects' && state.step === 14) {
    const { description, image } = state.tempData || {};
    setUserState(userId, { ...state, step: 13, tempData: { title: text, description, image } });
    bot.sendMessage(chatId, '✅ Название обновлено.');
    return;
  }
  
  // Edit description from confirmation (step 15) → go back to confirmation
  if (state.mode === 'edit_projects' && state.step === 15) {
    const { title, image } = state.tempData || {};
    setUserState(userId, { ...state, step: 13, tempData: { title, description: text, image } });
    bot.sendMessage(chatId, '✅ Описание обновлено.');
    return;
  }
  
  // Edit image from confirmation (step 16) → go back to confirmation
  if (state.mode === 'edit_projects' && state.step === 16) {
    const { title, description } = state.tempData || {};
    let imagePath = text || '/figma/default.png';
    
    const photo = msg.photo?.[msg.photo.length - 1];
    if (photo) {
      const fileId = photo.file_id;
      const filename = `project_${Date.now()}.png`;
      const downloadPath = path.join(process.cwd(), 'public', 'figma', filename);
      
      const fileStream = bot.getFileStream(fileId);
      await new Promise((resolve, reject) => {
        fileStream.on('error', reject);
        fileStream.pipe(fs.createWriteStream(downloadPath));
        fileStream.on('end', resolve);
      });
      
      imagePath = `/figma/${filename}`;
    }
    
    setUserState(userId, { ...state, step: 13, tempData: { title, description, image: imagePath } });
    bot.sendMessage(chatId, '✅ Фото обновлено.');
    return;
  }
  
  // Handle project edit - step 21: name input → confirm
  if (state.mode === 'edit_projects' && state.step === 21) {
    const { index, description, image } = state.tempData || {};
    setUserState(userId, { ...state, step: 24, tempData: { index, title: text, description, image } });
    showProjectConfirm(userId, chatId, state.tempData);
    return;
  }
  
  // Handle project edit - step 22: description input → confirm
  if (state.mode === 'edit_projects' && state.step === 22) {
    const { index, title, image } = state.tempData || {};
    setUserState(userId, { ...state, step: 24, tempData: { index, title, description: text, image } });
    showProjectConfirm(userId, chatId, state.tempData);
    return;
  }
  
  // Handle project edit - step 23: image input → confirm
  if (state.mode === 'edit_projects' && state.step === 23) {
    const { index, title, description } = state.tempData || {};
    let imagePath = text || '/figma/default.png';
    
    const photo = msg.photo?.[msg.photo.length - 1];
    if (photo) {
      const fileId = photo.file_id;
      const filename = `project_${Date.now()}.png`;
      const downloadPath = path.join(process.cwd(), 'public', 'figma', filename);
      
      const fileStream = bot.getFileStream(fileId);
      await new Promise((resolve, reject) => {
        fileStream.on('error', reject);
        fileStream.pipe(fs.createWriteStream(downloadPath));
        fileStream.on('end', resolve);
      });
      
      imagePath = `/figma/${filename}`;
    }
    
    setUserState(userId, { ...state, step: 24, tempData: { index, title, description, image: imagePath } });
    showProjectConfirm(userId, chatId, state.tempData);
    return;
  }
  
  // Handle footer editing - step 1: input → show preview
  if (state.mode === 'edit_footer' && state.step === 1) {
    setUserState(userId, { ...state, step: 2, tempData: text });
    const { getAllContent } = require('./content');
    const content = getAllContent();
    const keyboard = {
      inline_keyboard: [
        [
          { text: '✅ Сохранить', callback_data: 'confirm_footer_contacts' },
          { text: '❌ Отмена', callback_data: 'cancel_footer_contacts' }
        ]
      ]
    };
    bot.sendMessage(chatId,
      '⚠️ *Предварительный просмотр контактов:*\n\n' +
      '📝 *Новое значение:*\n' +
      '```\n' + text + '\n```\n\n' +
      '📋 *Текущее значение:*\n' +
      '```\n' +
      `Телефон: ${content.footer.contacts.phone}\n` +
      `Email: ${content.footer.contacts.email}\n` +
      `Телефон href: ${content.footer.contacts.phoneHref}\n` +
      `Email href: ${content.footer.contacts.emailHref}\n` +
      '```\n',
      { reply_markup: keyboard }
    );
    return;
  }
});
  
// Start bot
bot.startPolling();
console.log('🤖 Telegram Bot started and polling...');
