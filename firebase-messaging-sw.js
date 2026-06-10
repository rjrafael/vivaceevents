// Vivace Events — Firebase Cloud Messaging Service Worker
// This file MUST be at the root of your site: vivaceevents.com/firebase-messaging-sw.js
// It handles push notifications when the app is closed or in the background.

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDG6mjLSYp5gJpLZrI4hjBNIJrSC83qwj0",
  authDomain: "vivaceevents-1a8ff.firebaseapp.com",
  projectId: "vivaceevents-1a8ff",
  storageBucket: "vivaceevents-1a8ff.firebasestorage.app",
  messagingSenderId: "215295054411",
  appId: "1:215295054411:web:f7ce28486848ec0a1373ce"
});

const messaging = firebase.messaging();

// Background message handler — fires when app is closed/backgrounded
messaging.onBackgroundMessage(function(payload) {
  const title = (payload.notification && payload.notification.title) || (payload.data && payload.data.title) || '📣 Vivace Events';
  const body = (payload.notification && payload.notification.body) || (payload.data && payload.data.body) || '';
  const isEmergency = payload.data && payload.data.emergency === 'true';

  self.registration.showNotification(title, {
    body: body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: isEmergency ? 'vivace-emergency' : 'vivace-msg',
    requireInteraction: isEmergency,      // emergency stays until tapped
    vibrate: isEmergency ? [300,100,300,100,300] : [200,100,200],
    data: { url: '/' }
  });
});

// Tap on notification → open/focus the app
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (let i = 0; i < clientList.length; i++) {
        const c = clientList[i];
        if ('focus' in c) return c.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});
