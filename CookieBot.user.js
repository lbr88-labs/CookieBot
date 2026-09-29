// ==UserScript==
// @name CookieBot
// @namespace https://github.com/lbr88/CookieBot
// @version 2.052-43
// @description Automated bot for Cookie Clicker game
// @author lbr88
// @include /https?://orteil.dashnet.org/cookieclicker/
// @updateURL https://lbr88-labs.github.io/CookieBot/CookieBot.user.js
// @downloadURL https://lbr88-labs.github.io/CookieBot/CookieBot.user.js
// @grant none
// ==/UserScript==

(function() {
 'use strict';

 // Show loading status
 function showStatus(msg) {
  const existing = document.getElementById('cookiebot-status');
  if (existing) existing.remove();

  const status = document.createElement('div');
  status.id = 'cookiebot-status';
  status.style.cssText = 'position:fixed;top:10px;right:10px;background:#000;color:#0f0;padding:10px;border:2px solid #0f0;z-index:99999;font-family:monospace;';
  status.textContent = 'CookieBot: ' + msg;
  document.body.appendChild(status);

  setTimeout(() => status.remove(), 5000);
 }

 showStatus('Userscript loaded, waiting for game...');

 const readyCheck = setInterval(() => {
  const Game = window.Game || (typeof unsafeWindow !== 'undefined' ? unsafeWindow.Game : undefined);

  if (typeof Game !== 'undefined' && typeof Game.ready !== 'undefined' && Game.ready) {
   showStatus('Game ready, loading bot...');
    Game.LoadMod('https://lbr88-labs.github.io/CookieBot/cookieAutoPlayBeta.js');
   clearInterval(readyCheck);
   setTimeout(() => showStatus('Bot loaded!'), 1000);
  }
 }, 1000);
})();
