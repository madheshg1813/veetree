/* ═══════════════════════════════════════════════════════
   VeeTree — interactions
   ═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── CONFIG ─────────────────────────────────────────────
     Change the WhatsApp number here (country code, no +, no spaces)
     ───────────────────────────────────────────────────── */
  var WHATSAPP_NUMBER = '916382525233';

  var GENERAL_MESSAGE =
    "Hi VeeTree! 🌿 I came across your website and I'd love to know more about your products. Could you help me pick what's right for me?";

  function productMessage(name) {
    return "Hi VeeTree! 🌿 I'm interested in the *" + name +
      "*. Could you share the price, availability and delivery details?";
  }

  function waLink(text) {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
  }

  /* ── Wire up every WhatsApp link ─────────────────────── */
  document.querySelectorAll('[data-wa]').forEach(function (el) {
    var item = el.getAttribute('data-wa');
    var text = (item === 'general') ? GENERAL_MESSAGE : productMessage(item);
    el.setAttribute('href', waLink(text));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  /* ── Sticky header shadow ────────────────────────────── */
  var header = document.querySelector('.site-header');
  var fab = document.querySelector('.fab');

  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('is-stuck', y > 12);
    if (fab) fab.classList.toggle('is-visible', y > 520);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu ─────────────────────────────────────── */
  var burger = document.getElementById('burger');
  var mobileNav = document.getElementById('mobileNav');

  if (burger && mobileNav) {
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      mobileNav.hidden = open;
      burger.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    });

    mobileNav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Open menu');
        mobileNav.hidden = true;
      }
    });
  }

  /* ── Category filter ─────────────────────────────────── */
  var chips = document.querySelectorAll('.chip');
  var cards = document.querySelectorAll('.card');
  var emptyMsg = document.getElementById('gridEmpty');

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var filter = chip.getAttribute('data-filter');

      chips.forEach(function (c) {
        var active = c === chip;
        c.classList.toggle('is-active', active);
        c.setAttribute('aria-selected', String(active));
      });

      var shown = 0;
      cards.forEach(function (card) {
        var match = filter === 'all' || card.getAttribute('data-cat') === filter;
        card.classList.toggle('is-hidden', !match);
        card.classList.remove('is-filtering');
        if (match) {
          shown++;
          // force reflow so the animation replays
          void card.offsetWidth;
          card.classList.add('is-filtering');
        }
      });

      if (emptyMsg) emptyMsg.hidden = shown > 0;
    });
  });

  /* ── Scroll reveal ───────────────────────────────────── */
  var revealables = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ── Stagger cards inside the grid ───────────────────── */
  document.querySelectorAll('#grid .card').forEach(function (card, i) {
    card.style.setProperty('--d', (i % 4) * 0.07 + 's');
  });

  /* ── Footer year ─────────────────────────────────────── */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
