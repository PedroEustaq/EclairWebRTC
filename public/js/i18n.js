// ============================================================
// i18n.js — Internacionalização (PT-BR / EN)
// Deve ser carregado ANTES dos demais scripts.
// Uso no HTML:
//   data-i18n="chave"              -> substitui textContent
//   data-i18n-html="chave"         -> substitui innerHTML (com tags)
//   data-i18n-placeholder="chave"  -> substitui placeholder
//   data-i18n-title="chave"        -> substitui title
//   data-i18n-alt="chave"          -> substitui alt
//   data-i18n-aria-label="chave"   -> substitui aria-label
//   data-lang-switch               -> botão que alterna o idioma
// Uso no JS: i18n.t('chave.da.string')
// ============================================================

(function () {
  'use strict';

  const translations = {
    // ---------------- PORTUGUÊS ----------------
    pt: {
      common: {
        cancel: "Cancelar",
        join: "Entrar"
      },
      header: {
        aboutUs: "🍪Sobre Nós",
        langSwitch: "EN"
      },
      index: {
        title: "Video Chamadas<br>temporárias.",
        subtitle: "Sem nenhum custo.",
        rules: 'Siga as <a class="regra" href="/html/regras.html">regras da plataforma</a>',
        termsLabel: "Li e estou ciente dos termos e condições.",
        createRoom: "Criar sala",
        joinRoom: "Conectar a uma Sala",
        modalTitle: "Conectar ao Usuário",
        modalDesc: "Digite o código do usuário (ex: ABC12345):",
        modalLabel: "Código do Usuário",
        modal2Title: "Conectar a uma Sala",
        modal2Placeholder: "Digite o código da Sala",
        modal2Enter: "Entrar",
        alerts: {
          invalidCode: "Código inválido. Use exatamente 8 caracteres (A-Z, 0-9)."
        }
      },
      chat: {
        roomCode: "Código da sala:",
        you: "Você",
        micAlt: "Microfone: clique para ativar/desativar",
        camAlt: "Câmera",
        hangupAlt: "Desligar",
        joinTitle: "Entrar na sala",
        joinDesc: "Digite o ID da sala:",
        roomIdLabel: "ID da Sala",
        alerts: {
          authFail: "Não foi possível autenticar no servidor. Verifique sua conexão.",
          invalidRoom: "Código da sala inválido.",
          mediaError: "Não foi possível acessar câmera/microfone ou entrar na sala.",
          notFound: "Sala não encontrada. Verifique o código.",
          notAuth: "Usuário não autenticado.",
          copyError: "Erro ao copiar!",
          copyTitle: "Copiar código",
          copiedTitle: "Copiado!"
        }
      },
      shared: {
        permConfirm: "⚠️ Para usar esta funcionalidade, é necessário permitir acesso à câmera e microfone.\n\nDeseja ativar as permissões agora?",
        permDenied: "❌ Permissões negadas. Não é possível continuar sem acesso à câmera e microfone.",
        permRefused: "❌ Sem permissões de mídia, não é possível usar esta funcionalidade."
      },
      terms: {
        pageTitle: "Termos e Condições - EclairWeb",
        header: "Termos e Condições",
        heading: "Termos e Condições de Uso",
        subtitle: "Plataforma EclairWeb",
        date: "Data de vigência: 28 de Julho de 2025",
        intro: "Seja bem-vindo(a) à EclairWeb, uma plataforma de chamadas de vídeo rápidas entre amigos. Ao acessar ou utilizar os serviços da EclairWeb, você concorda integralmente com os presentes Termos e Condições de Uso. Recomendamos a leitura atenta deste documento antes de utilizar a plataforma.",
        s1_t: "1. Objeto",
        s1_b: "Estes Termos têm como finalidade regular o uso da EclairWeb, uma plataforma digital destinada a permitir chamadas de vídeo entre usuários, com foco em interações rápidas, privadas e seguras entre pessoas conhecidas. O ambiente da plataforma é projetado para promover o respeito mútuo e é restrito a usuários com idade igual ou superior a 16 (dezesseis) anos.",
        s2_t: "2. Aceitação dos Termos",
        s2_b: "Ao utilizar a EclairWeb, o usuário declara que leu, compreendeu e concorda com todos os termos aqui descritos. Caso não concorde com qualquer cláusula, o uso da plataforma deverá ser imediatamente interrompido.",
        s3_t: "3. Requisitos de Idade",
        s3_b: "O uso da EclairWeb é proibido a menores de 16 anos. Ao utilizar a plataforma, o usuário declara, sob as penas da lei, que possui 16 (dezesseis) anos ou mais.",
        s4_t: "4. Conduta do Usuário",
        s4_b: "Ao utilizar a EclairWeb, o usuário compromete-se a:",
        s4_li1: "Agir com respeito, empatia e civilidade durante todas as interações;",
        s4_li2: "Não praticar condutas ofensivas, preconceituosas, abusivas, violentas, sexuais, ilegais ou de má fé;",
        s4_li3: "Não utilizar a plataforma para fins comerciais, promocionais ou políticos sem autorização expressa da administração;",
        s4_li4: "Não registrar, divulgar ou compartilhar gravações (vídeo, áudio ou imagem) de chamadas sem o consentimento de todos os participantes;",
        s4_li5: "Utilizar a plataforma exclusivamente para fins pessoais e legais.",
        s5_t: "5. Privacidade e Segurança",
        s5_b1: "A EclairWeb preza pela privacidade e segurança de seus usuários. Todos os dados coletados são tratados conforme a legislação vigente e nossa Política de Privacidade, disponível no site da plataforma.",
        s5_b2: "Nos reservamos o direito de realizar monitoramento limitado para identificar violações a estes Termos, respeitando os direitos fundamentais dos usuários.",
        s6_t: "6. Suspensão e Cancelamento de Acesso",
        s6_b: "A EclairWeb poderá, a seu exclusivo critério, suspender ou cancelar imediatamente o acesso de qualquer usuário que:",
        s6_li1: "Descumprir qualquer disposição destes Termos;",
        s6_li2: "Apresentar comportamento inadequado, ofensivo ou que coloque outros usuários em risco;",
        s6_li3: "Utilizar a plataforma para atividades ilícitas, enganosas ou maliciosas;",
        s6_li4: "Comprometer a segurança, integridade ou funcionamento da plataforma.",
        s7_t: "7. Limitação de Responsabilidade",
        s7_b1: "A EclairWeb não se responsabiliza pelas ações ou conteúdos transmitidos por seus usuários durante as chamadas. Cada usuário é inteiramente responsável por suas próprias condutas e comunicações.",
        s7_b2: "A plataforma também não garante disponibilidade ininterrupta dos serviços, estando sujeita a manutenções, atualizações ou falhas técnicas.",
        s8_t: "8. Modificações nos Termos",
        s8_b: "A EclairWeb poderá atualizar estes Termos a qualquer momento, sendo responsabilidade do usuário revisá-los periodicamente. A continuidade do uso da plataforma após alterações configura aceitação integral das novas disposições.",
        s9_t: "9. Disposições Gerais",
        s9_b: "Estes Termos representam o acordo integral entre o usuário e a EclairWeb. A nulidade parcial de qualquer cláusula não afetará a validade das demais. A tolerância a qualquer descumprimento não implica em renúncia de direitos ou alteração contratual.",
        s10_t: "10. Foro",
        s10_b: "Para dirimir quaisquer controvérsias oriundas destes Termos, fica eleito o foro da Comarca de Belo Horizonte, Estado de Minas Gerais, Brasil, com renúncia expressa a qualquer outro, por mais privilegiado que seja."
      }
    },

    // ---------------- ENGLISH ----------------
    en: {
      common: {
        cancel: "Cancel",
        join: "Join"
      },
      header: {
        aboutUs: "🍪About Us",
        langSwitch: "PT"
      },
      index: {
        title: "Temporary<br>Video Calls.",
        subtitle: "At no cost.",
        rules: 'Follow the <a class="regra" href="/html/regras.html">platform rules</a>',
        termsLabel: "I have read and agree to the terms and conditions.",
        createRoom: "Create room",
        joinRoom: "Connect to a Room",
        modalTitle: "Connect to User",
        modalDesc: "Enter the user code (e.g. ABC12345):",
        modalLabel: "User Code",
        modal2Title: "Connect to a Room",
        modal2Placeholder: "Enter the Room Code",
        modal2Enter: "Enter",
        alerts: {
          invalidCode: "Invalid code. Use exactly 8 characters (A-Z, 0-9)."
        }
      },
      chat: {
        roomCode: "Room code:",
        you: "You",
        micAlt: "Microphone: click to enable/disable",
        camAlt: "Camera",
        hangupAlt: "Hang up",
        joinTitle: "Join room",
        joinDesc: "Enter the room ID:",
        roomIdLabel: "Room ID",
        alerts: {
          authFail: "Could not authenticate with the server. Please check your connection.",
          invalidRoom: "Invalid room code.",
          mediaError: "Could not access camera/microphone or join the room.",
          notFound: "Room not found. Please check the code.",
          notAuth: "User not authenticated.",
          copyError: "Error copying!",
          copyTitle: "Copy code",
          copiedTitle: "Copied!"
        }
      },
      shared: {
        permConfirm: "⚠️ To use this feature, you must allow access to the camera and microphone.\n\nDo you want to enable permissions now?",
        permDenied: "❌ Permissions denied. Cannot continue without access to camera and microphone.",
        permRefused: "❌ Without media permissions, this feature cannot be used."
      },
      terms: {
        pageTitle: "Terms and Conditions - EclairWeb",
        header: "Terms and Conditions",
        heading: "Terms and Conditions of Use",
        subtitle: "EclairWeb Platform",
        date: "Effective date: July 28, 2025",
        intro: "Welcome to EclairWeb, a platform for quick video calls between friends. By accessing or using EclairWeb's services, you fully agree to these Terms and Conditions of Use. We recommend careful reading of this document before using the platform.",
        s1_t: "1. Purpose",
        s1_b: "These Terms aim to regulate the use of EclairWeb, a digital platform designed to enable video calls between users, focused on quick, private and secure interactions between known people. The platform environment is designed to promote mutual respect and is restricted to users aged 16 (sixteen) or older.",
        s2_t: "2. Acceptance of Terms",
        s2_b: "By using EclairWeb, the user declares that they have read, understood and agree with all the terms described here. If you disagree with any clause, use of the platform must be immediately stopped.",
        s3_t: "3. Age Requirements",
        s3_b: "Use of EclairWeb is prohibited for anyone under 16 years of age. By using the platform, the user declares, under penalty of law, that they are 16 (sixteen) years of age or older.",
        s4_t: "4. User Conduct",
        s4_b: "When using EclairWeb, the user agrees to:",
        s4_li1: "Act with respect, empathy and civility during all interactions;",
        s4_li2: "Not engage in offensive, prejudiced, abusive, violent, sexual, illegal or bad-faith behavior;",
        s4_li3: "Not use the platform for commercial, promotional or political purposes without the express authorization of the administration;",
        s4_li4: "Not record, disclose or share recordings (video, audio or image) of calls without the consent of all participants;",
        s4_li5: "Use the platform exclusively for personal and legal purposes.",
        s5_t: "5. Privacy and Security",
        s5_b1: "EclairWeb values the privacy and security of its users. All collected data is handled in accordance with current legislation and our Privacy Policy, available on the platform's website.",
        s5_b2: "We reserve the right to perform limited monitoring to identify violations of these Terms, respecting the fundamental rights of users.",
        s6_t: "6. Suspension and Cancellation of Access",
        s6_b: "EclairWeb may, at its sole discretion, suspend or immediately cancel the access of any user who:",
        s6_li1: "Breaches any provision of these Terms;",
        s6_li2: "Exhibits inappropriate, offensive behavior or puts other users at risk;",
        s6_li3: "Uses the platform for illicit, deceptive or malicious activities;",
        s6_li4: "Compromises the security, integrity or operation of the platform.",
        s7_t: "7. Limitation of Liability",
        s7_b1: "EclairWeb is not responsible for the actions or content transmitted by its users during calls. Each user is entirely responsible for their own conduct and communications.",
        s7_b2: "The platform also does not guarantee uninterrupted availability of services, being subject to maintenance, updates or technical failures.",
        s8_t: "8. Modifications to the Terms",
        s8_b: "EclairWeb may update these Terms at any time, and it is the user's responsibility to review them periodically. Continued use of the platform after changes constitutes full acceptance of the new provisions.",
        s9_t: "9. General Provisions",
        s9_b: "These Terms represent the entire agreement between the user and EclairWeb. The partial nullity of any clause will not affect the validity of the others. Tolerance of any breach does not imply waiver of rights or contractual changes.",
        s10_t: "10. Jurisdiction",
        s10_b: "To resolve any disputes arising from these Terms, the forum of the District of Belo Horizonte, State of Minas Gerais, Brazil, is elected, with express waiver of any other, however privileged it may be."
      }
    }
  };

  const STORAGE_KEY = 'eclair_lang';

  function detectLanguage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && translations[stored]) return stored;
    } catch (_) { /* localStorage indisponível */ }
    const browser = (navigator.language || 'pt').toLowerCase();
    return browser.startsWith('pt') ? 'pt' : 'en';
  }

  let currentLang = detectLanguage();

  function lookup(dict, key) {
    const parts = key.split('.');
    let val = dict;
    for (const p of parts) {
      if (val == null) return undefined;
      if (Array.isArray(val)) {
        const idx = parseInt(p, 10);
        if (isNaN(idx)) return undefined;
        val = val[idx];
      } else if (typeof val === 'object' && p in val) {
        val = val[p];
      } else {
        return undefined;
      }
    }
    return val;
  }

  function t(key) {
    let val = lookup(translations[currentLang], key);
    if (val === undefined) val = lookup(translations.pt, key);
    return typeof val === 'string' ? val : key;
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      el.innerHTML = t(el.getAttribute('data-i18n-html'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      el.title = t(el.getAttribute('data-i18n-title'));
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      el.alt = t(el.getAttribute('data-i18n-alt'));
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria-label')));
    });
    document.querySelectorAll('[data-lang-switch]').forEach(el => {
      el.textContent = t('header.langSwitch');
    });
    document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en';
  }

  function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) { /* ignore */ }
    applyTranslations();
    window.dispatchEvent(new CustomEvent('i18n:changed', { detail: { lang } }));
  }

  function toggleLanguage() {
    setLanguage(currentLang === 'pt' ? 'en' : 'pt');
  }

  function getLanguage() { return currentLang; }

  function init() {
    document.querySelectorAll('[data-lang-switch]').forEach(btn => {
      if (!btn.dataset.i18nBound) {
        btn.addEventListener('click', toggleLanguage);
        btn.dataset.i18nBound = '1';
      }
    });
    applyTranslations();
  }

  window.i18n = { t, setLanguage, toggleLanguage, applyTranslations, getLanguage };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();