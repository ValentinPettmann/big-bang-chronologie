/**
 * Chronologie du Big Bang — Application interactive (Canvas 2D & Frise Logarithmique)
 * Aucune dépendance externe. Entièrement en français.
 */

(() => {
  'use strict';

  /**
   * Bornes de l'échelle logarithmique log10(temps en secondes)
   * De 10^-43 s (ère de Planck) à ~4,35 x 10^17 s (13,8 milliards d'années, log10 ≈ 17.64)
   */
  const LOG_MIN = -43;
  const LOG_MAX = 17.64;

  /**
   * Définition complète des 13 étapes cosmologiques requises
   * logT : position représentative en log10(secondes) sur la frise chronologique
   */
  const ERAS = [
    {
      id: 'planck',
      shortLabel: 'Planck',
      category: 'Univers quantique primordial',
      title: 'Ère de Planck',
      timeRange: '0 à 10⁻⁴³ s',
      temperature: '~10³² K',
      logT: -43,
      logDisplay: 'log₁₀(t/s) ≤ -43',
      description:
        "Durant l'ère de Planck, les quatre forces fondamentales (gravité, électromagnétisme, interactions nucléaires forte et faible) sont unifiées en une seule « superforce ». Les effets de la gravité quantique dominent : l'espace-temps lui-même fluctue violemment à l'échelle de Planck (~10⁻³⁵ m) sous forme d'une « mousse quantique ».",
      highlights: [
        '<strong>Unification totale :</strong> les 4 interactions fondamentales sont indiscernables.',
        '<strong>Limite physique actuelle :</strong> nécessite une théorie de la gravité quantique au-delà de la relativité générale.'
      ],
      legend: [
        { color: '#ffffff', label: 'Fluctuations d’espace-temps' },
        { color: '#e040fb', label: 'Superforce unifiée' }
      ]
    },
    {
      id: 'gut',
      shortLabel: 'G.U.T.',
      category: 'Brisure de symétrie primordiale',
      title: 'Ère de grande unification',
      timeRange: '10⁻⁴³ à 10⁻³⁶ s',
      temperature: '~10²⁸ à 10³² K',
      logT: -39.5,
      logDisplay: 'log₁₀(t/s) ≈ -43 à -36',
      description:
        "À la fin de l'ère de Planck, la gravitation se sépare des trois autres forces. Les interactions électromagnétique, faible et forte demeurent unifiées au sein d'une force dite de Grande Unification (GUT). D'hypothétiques bosons X et Y extrêmement massifs convertissent librement quarks et leptons.",
      highlights: [
        '<strong>Séparation de la gravité :</strong> la gravitation devient une interaction distincte.',
        '<strong>Symétrie GUT :</strong> quarks et leptons interagissent via les bosons de jauge X et Y.'
      ],
      legend: [
        { color: '#ffd54f', label: 'Gravitation séparée' },
        { color: '#00e5ff', label: 'Force électronucléaire (GUT)' }
      ]
    },
    {
      id: 'inflation',
      shortLabel: 'Inflation',
      category: 'Expansion exponentielle',
      title: 'Inflation cosmique',
      timeRange: '~10⁻³⁶ à 10⁻³² s',
      temperature: '~10²⁷ à 10²⁸ K (chute rapide, puis réchauffement)',
      logT: -34,
      logDisplay: 'log₁₀(t/s) ≈ -36 à -32',
      description:
        "Déclenchée par la séparation de l'interaction forte ou la décroissance du champ d'inflaton, l'inflation dilate l'Univers d'un facteur d'au moins 10²⁶ en une fraction infime de seconde. Elle aplanit la géométrie cosmique, homogénéise la température et étire les fluctuations quantiques microscopiques qui deviendront les graines des futures galaxies.",
      highlights: [
        '<strong>Expansion vertigineuse :</strong> le volume de l’Univers croît de manière exponentielle.',
        '<strong>Réchauffement :</strong> l’énergie du champ d’inflaton se convertit en un bain dense de particules.'
      ],
      legend: [
        { color: '#4dd0e1', label: 'Trame spatiale en dilatation' },
        { color: '#ffab40', label: 'Fluctuations quantiques étirées' }
      ]
    },
    {
      id: 'electroweak',
      shortLabel: 'Électrofaible',
      category: 'Ère des champs de jauge',
      title: 'Ère électrofaible',
      timeRange: '10⁻³² à 10⁻¹² s',
      temperature: '~10¹⁵ à 10²⁷ K',
      logT: -22,
      logDisplay: 'log₁₀(t/s) ≈ -32 à -12',
      description:
        "L'interaction forte est désormais distincte, tandis que l'électromagnétisme et l'interaction faible restent fusionnés en une force électrofaible. Vers 10⁻¹² s (~10¹⁵ K), le champ de Higgs acquiert une valeur non nulle dans le vide : c'est la brisure de symétrie électrofaible qui confère une masse aux bosons W, Z, aux quarks et aux leptons.",
      highlights: [
        '<strong>Mécanisme de Higgs :</strong> les particules élémentaires acquièrent leur masse vers 10⁻¹² s.',
        '<strong>Bosons W, Z et photons :</strong> séparation finale des 4 forces fondamentales connues.'
      ],
      legend: [
        { color: '#ffd740', label: 'Champ de Higgs actif' },
        { color: '#7c4dff', label: 'Bosons W / Z / γ' }
      ]
    },
    {
      id: 'quarks',
      shortLabel: 'Quarks',
      category: 'Plasma primordial',
      title: 'Ère des quarks',
      timeRange: '10⁻¹² à 10⁻⁶ s',
      temperature: '~10¹² à 10¹⁵ K',
      logT: -9,
      logDisplay: 'log₁₀(t/s) ≈ -12 à -6',
      description:
        "Les quatre forces fondamentales ont pris leur forme actuelle, mais la température et la densité sont encore trop élevées pour que les quarks se lient en hadrons. L'Univers est rempli d'un plasma dense et ultra-chaud de quarks et de gluons libres, accompagné de leptons. Une légère asymétrie matière-antimatière (~1 milliardième) prépare la survie de la matière.",
      highlights: [
        '<strong>Plasma quarks-gluons :</strong> les quarks circulent librement sans être confinés.',
        '<strong>Baryogénèse :</strong> léger excès d’environ 1 particule de matière pour 10⁹ paires matière-antimatière.'
      ],
      legend: [
        { color: '#ff5252', label: 'Quarks u, d, s… libres' },
        { color: '#69f0ae', label: 'Gluons (interaction forte)' }
      ]
    },
    {
      id: 'hadrons',
      shortLabel: 'Hadrons',
      category: 'Confinement de la matière',
      title: 'Ère des hadrons',
      timeRange: '10⁻⁶ s à 1 s',
      temperature: '~10¹⁰ à 10¹² K',
      logT: -3,
      logDisplay: 'log₁₀(t/s) ≈ -6 à 0',
      description:
        "Lorsque la température descend sous ~10¹² K, les quarks ne peuvent plus exister à l'état libre : ils s'assemblent par trois (baryons : protons et neutrons) ou par paires quark-antiquark (mésons). La quasi-totalité des hadrons et antihadrons s'annihilent en photons, ne laissant subsister que le minuscule reliquat de protons et de neutrons.",
      highlights: [
        '<strong>Confinement des quarks :</strong> naissance des protons et des neutrons.',
        '<strong>Annihilation baryon-antibaryon :</strong> production massive de photons énergétiques.'
      ],
      legend: [
        { color: '#ff7043', label: 'Protons (uud)' },
        { color: '#90caf9', label: 'Neutrons (udd)' },
        { color: '#fff59d', label: 'Photons d’annihilation' }
      ]
    },
    {
      id: 'leptons',
      shortLabel: 'Leptons',
      category: 'Domination leptonique',
      title: 'Ère des leptons',
      timeRange: '1 s à 10 s',
      temperature: '~10⁹ à 10¹⁰ K',
      logT: 0.5,
      logDisplay: 'log₁₀(t/s) ≈ 0 à 1',
      description:
        "Après l'annihilation des hadrons, les leptons (électrons, muons, taus, neutrinos) et leurs antiparticules dominent la masse-énergie de l'Univers. Vers t ≈ 1 s, les neutrinos se découplent de la matière et commencent à voyager librement. Vers t ≈ 10 s, électrons et positrons s'annihilent à leur tour, ne laissant qu'un léger excès d'électrons.",
      highlights: [
        '<strong>Découplage des neutrinos (~1 s) :</strong> création du fond cosmologique de neutrinos.',
        '<strong>Annihilation e⁻ / e⁺ :</strong> réchauffe le bain de photons cosmiques.'
      ],
      legend: [
        { color: '#40c4ff', label: 'Électrons (e⁻)' },
        { color: '#ff80ab', label: 'Positrons (e⁺)' },
        { color: '#b388ff', label: 'Neutrinos découplés' }
      ]
    },
    {
      id: 'nucleosynthesis',
      shortLabel: 'Nucléosynthèse',
      category: 'Premiers noyaux atomiques',
      title: 'Nucléosynthèse primordiale',
      timeRange: '~10 s à 20 min (1,2 × 10³ s)',
      temperature: '~10⁹ K (de 10⁹ à ~3×10⁸ K)',
      logT: 2.5,
      logDisplay: 'log₁₀(t/s) ≈ 1 à 3,1',
      description:
        "La température ayant suffisamment baissé (~1 milliard de kelvins), protons et neutrons fusionnent sans être immédiatement brisés par les photons gamma. En moins de vingt minutes se forment les premiers noyaux légers : deutérium, hélium-4 et traces de lithium-7. La matière baryonique atteint sa composition primordiale : ~75 % d'hydrogène (¹H) et ~25 % d'hélium (⁴He) en masse.",
      highlights: [
        '<strong>75 % Hydrogène / 25 % Hélium en masse :</strong> abondance universelle confirmée par l’observation.',
        '<strong>Traces légères :</strong> deutérium (²H), hélium-3 (³He) et lithium-7 (⁷Li).'
      ],
      legend: [
        { color: '#ff5252', label: 'Hydrogène ¹H (75 % masse)' },
        { color: '#ffd54f', label: 'Hélium ⁴He (25 % masse)' }
      ]
    },
    {
      id: 'recombination',
      shortLabel: 'Recombinaison / FDC',
      category: 'L’Univers devient transparent',
      title: 'Ère des photons puis Recombinaison & Fond diffus cosmologique',
      timeRange: '~380 000 ans (~1,2 × 10¹³ s)',
      temperature: '~3 000 K',
      logT: 13.08,
      logDisplay: 'log₁₀(t/s) ≈ 13,1',
      description:
        "Durant des centaines de milliers d'années (ère des photons), l'Univers est un brouillard opaque de plasma où les photons diffusent sans cesse sur les électrons libres. Vers 380 000 ans, à ~3 000 K, les électrons sont capturés par les noyaux d'hydrogène et d'hélium pour former les premiers atomes neutres (recombinaison). Les photons se libèrent enfin : c'est le Fond Diffus Cosmologique (CMB).",
      highlights: [
        '<strong>Atomes neutres :</strong> les électrons se lient aux noyaux H et He.',
        '<strong>Découplage des photons :</strong> émission de la première lumière fossile observable (CMB).'
      ],
      legend: [
        { color: '#ffb74d', label: 'Photons du Fond Diffus (libérés)' },
        { color: '#80deea', label: 'Atomes neutres H / He' }
      ]
    },
    {
      id: 'dark_ages',
      shortLabel: 'Âges sombres',
      category: 'Silence cosmique',
      title: 'Âges sombres',
      timeRange: '380 000 ans à ~100–200 millions d’années',
      temperature: '~3 000 K à ~60 K',
      logT: 14.8,
      logDisplay: 'log₁₀(t/s) ≈ 13,1 à 15,8',
      description:
        "Après la recombinaison, les photons du fond diffus se décalent vers l'infrarouge avec l'expansion. Aucune étoile n'étant encore allumée, l'Univers plonge dans une obscurité totale. Dans l'ombre, la matière noire et le gaz d'hydrogène neutre (émettant la raie à 21 cm) s'effondrent lentement sous l'effet de la gravitation dans les filaments cosmiques.",
      highlights: [
        '<strong>Aucune source de lumière visible :</strong> aucune étoile n’existe encore.',
        '<strong>Effondrement gravitationnel :</strong> les halos de matière noire attirent le gaz primordial.'
      ],
      legend: [
        { color: '#5c6bc0', label: 'Halos de matière noire' },
        { color: '#78909c', label: 'Gaz d’hydrogène neutre (raie 21 cm)' }
      ]
    },
    {
      id: 'first_stars',
      shortLabel: '1ʳᵉˢ Étoiles',
      category: 'Aube cosmique & Réionisation',
      title: 'Premières étoiles',
      timeRange: '~100 à 200 millions d’années (Ma)',
      temperature: '~30 à 60 K (fond cosmique)',
      logT: 15.67,
      logDisplay: 'log₁₀(t/s) ≈ 15,5 à 15,8',
      description:
        "Au cœur des halos les plus denses, le gaz d'hydrogène et d'hélium se comprime jusqu'à amorcer la fusion thermonucléaire : les étoiles de Population III s'allument. Géantes, très chaudes et dépourvues d'éléments lourds, elles émettent un rayonnement ultraviolet intense qui réionise le gaz environnant et forgent, lors de leurs supernovae, les premiers atomes de carbone, d'oxygène et de fer.",
      highlights: [
        '<strong>Étoiles de Population III :</strong> massives (100+ masses solaires) et à courte durée de vie.',
        '<strong>Nucléosynthèse stellaire :</strong> création des premiers éléments lourds (carbone, oxygène, fer).'
      ],
      legend: [
        { color: '#80d8ff', label: 'Étoiles primordiales (Pop III)' },
        { color: '#ea80fc', label: 'Bulles de réionisation UV & Supernovae' }
      ]
    },
    {
      id: 'galaxies',
      shortLabel: 'Galaxies',
      category: 'Grandes structures cosmiques',
      title: 'Formation des galaxies',
      timeRange: '~400 Ma à 1 milliard d’années (Ga)',
      temperature: '~15 à 25 K',
      logT: 16.3,
      logDisplay: 'log₁₀(t/s) ≈ 16,1 à 16,5',
      description:
        "Les amas d'étoiles et les nuages de gaz enrichis fusionnent au sein de vastes halos de matière noire pour former les premières proto-galaxies, puis des galaxies spirales et elliptiques structurées. Des trous noirs supermassifs croissent en leur centre (quasars), et la réionisation complète de l'Univers intergalactique s'achève autour de 1 milliard d'années.",
      highlights: [
        '<strong>Fusions hiérarchiques :</strong> assemblage des galaxies le long de la toile cosmique.',
        '<strong>Fin de la réionisation (~1 Ga) :</strong> le milieu intergalactique redevient ionisé et transparent.'
      ],
      legend: [
        { color: '#ffd180', label: 'Bulbes galactiques & Quasars' },
        { color: '#82b1ff', label: 'Bras spiraux & jeunes étoiles' }
      ]
    },
    {
      id: 'today',
      shortLabel: 'Aujourd’hui',
      category: 'Ère de l’énergie sombre',
      title: 'Aujourd’hui — Univers actuel',
      timeRange: '13,8 milliards d’années (~4,35 × 10¹⁷ s)',
      temperature: '2,725 K',
      logT: 17.64,
      logDisplay: 'log₁₀(t/s) ≈ +17,64',
      description:
        "13,8 milliards d'années après le Big Bang, le fond diffus cosmologique s'est refroidi jusqu'à 2,725 K (-270,425 °C). Des milliards de galaxies s'organisent en amas et filaments formant la toile cosmique. Le Système solaire est né il y a 4,6 milliards d'années à partir des poussières d'anciennes étoiles, et l'expansion de l'Univers s'accélère sous l'effet de l'énergie sombre.",
      highlights: [
        '<strong>Température du CMB :</strong> 2,725 K mesurée avec une précision remarquable.',
        '<strong>Bilan énergétique :</strong> ~68 % énergie sombre, ~27 % matière noire, ~5 % matière baryonique.'
      ],
      legend: [
        { color: '#64ffda', label: 'Toile cosmique & Galaxies' },
        { color: '#ffd740', label: 'Systèmes planétaires & Étoiles' }
      ]
    }
  ];

  // État global de l'application
  const state = {
    currentIndex: 0,
    isPlaying: false,
    autoplayDurationMs: 6500, // 6,5 s par étape en lecture automatique
    autoplayElapsedMs: 0,
    lastFrameTime: performance.now(),
    eraStartTime: performance.now(),
    particles: []
  };

  // Références DOM
  const canvas = document.getElementById('cosmos-canvas');
  const ctx = canvas.getContext('2d');
  const hudTime = document.getElementById('hud-time');
  const hudTemp = document.getElementById('hud-temp');
  const canvasLegend = document.getElementById('canvas-legend');
  const stepCounter = document.getElementById('era-step-counter');
  const logIndicator = document.getElementById('era-log-indicator');

  const infoCategory = document.getElementById('info-category');
  const infoTitle = document.getElementById('info-title');
  const infoTime = document.getElementById('info-time');
  const infoTemp = document.getElementById('info-temp');
  const infoDesc = document.getElementById('info-description');
  const infoHighlights = document.getElementById('info-highlights');

  const btnPrev = document.getElementById('btn-prev');
  const btnPlay = document.getElementById('btn-play');
  const btnNext = document.getElementById('btn-next');
  const iconPlay = document.getElementById('icon-play');
  const iconPause = document.getElementById('icon-pause');
  const playLabel = document.getElementById('play-label');
  const autoplayProgress = document.getElementById('autoplay-progress');

  const timelineAxis = document.getElementById('timeline-axis');
  const timelineTrackFill = document.getElementById('timeline-track-fill');
  const timelineMarkers = document.getElementById('timeline-markers');

  /**
   * Convertit une valeur log10(t en s) en pourcentage horizontal [0, 100] sur la frise
   */
  function logToPercent(logVal) {
    const clamped = Math.max(LOG_MIN, Math.min(LOG_MAX, logVal));
    return ((clamped - LOG_MIN) / (LOG_MAX - LOG_MIN)) * 100;
  }

  /**
   * Construit l'axe gradué logarithmique et les marqueurs cliquables
   */
  function buildLogTimeline() {
    // 1. Graduations régulières de 10^-40 s à 10^15 s
    const ticks = [-40, -30, -20, -10, 0, 10, 17.64];
    timelineAxis.innerHTML = '';
    ticks.forEach((val) => {
      const tickEl = document.createElement('div');
      tickEl.className = 'axis-tick';
      tickEl.style.left = `${logToPercent(val)}%`;
      tickEl.textContent = val === 17.64 ? '10¹⁷·⁶s' : `10^${val}s`;
      timelineAxis.appendChild(tickEl);
    });

    // 2. Marqueurs des 13 ères
    timelineMarkers.innerHTML = '';
    ERAS.forEach((era, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `timeline-marker ${idx % 2 === 0 ? 'label-bottom' : 'label-top'}${idx >= 9 ? ' label-crowded' : ''}`;
      // Les 4 dernières ères sont très rapprochées sur l'échelle log : étiquette visible seulement si active/survolée
      btn.style.left = `${logToPercent(era.logT)}%`;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-label', `${idx + 1}. ${era.title} (${era.timeRange})`);
      btn.setAttribute('title', `${era.title} — ${era.timeRange} (log₁₀(t) ≈ ${era.logT})`);
      btn.dataset.index = String(idx);

      const labelSpan = document.createElement('span');
      labelSpan.className = 'marker-label';
      labelSpan.textContent = era.shortLabel;
      btn.appendChild(labelSpan);

      btn.addEventListener('click', () => {
        selectEra(idx, true);
      });

      timelineMarkers.appendChild(btn);
    });
  }

  /**
   * Initialise les particules propres à chaque ère pour l'animation Canvas
   */
  function initParticlesForEra(index) {
    const count = 95;
    state.particles = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random();
      state.particles.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.004,
        vy: (Math.random() - 0.5) * 0.004,
        angle,
        radius,
        size: 1.5 + Math.random() * 3.5,
        phase: Math.random() * Math.PI * 2,
        type: i % 4,
        arm: i % 3
      });
    }
    state.eraStartTime = performance.now();
  }

  /**
   * Sélectionne une ère par son index et met à jour l'interface
   */
  function selectEra(index, resetAutoplayTimer = false) {
    const clampedIndex = Math.max(0, Math.min(ERAS.length - 1, index));
    state.currentIndex = clampedIndex;
    if (resetAutoplayTimer) {
      state.autoplayElapsedMs = 0;
    }

    const era = ERAS[clampedIndex];

    // Mise à jour des textes et métriques
    stepCounter.textContent = `Étape ${clampedIndex + 1} / ${ERAS.length}`;
    logIndicator.textContent = era.logDisplay;
    hudTime.textContent = era.timeRange;
    hudTemp.textContent = era.temperature;

    infoCategory.textContent = era.category;
    infoTitle.textContent = era.title;
    infoTime.textContent = era.timeRange;
    infoTemp.textContent = era.temperature;
    infoDesc.textContent = era.description;

    // Points clés
    infoHighlights.innerHTML = `<ul>${era.highlights.map((h) => `<li>${h}</li>`).join('')}</ul>`;

    // Légende du canvas
    canvasLegend.innerHTML = era.legend
      .map(
        (item) =>
          `<span class="legend-item"><span class="legend-dot" style="background:${item.color}"></span>${item.label}</span>`
      )
      .join('');

    // Accessibilité du canvas
    canvas.setAttribute(
      'aria-label',
      `Animation : ${era.title}, de ${era.timeRange}, température ${era.temperature}`
    );

    // État des boutons Précédent / Suivant
    btnPrev.disabled = clampedIndex === 0;
    btnNext.disabled = clampedIndex === ERAS.length - 1;

    // Mise à jour de la frise logarithmique
    const pct = logToPercent(era.logT);
    timelineTrackFill.style.width = `${pct}%`;

    const markerButtons = timelineMarkers.querySelectorAll('.timeline-marker');
    markerButtons.forEach((btn, idx) => {
      const isCurrent = idx === clampedIndex;
      btn.classList.toggle('is-active', isCurrent);
      btn.classList.toggle('is-past', idx < clampedIndex);
      btn.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
    });

    initParticlesForEra(clampedIndex);
  }

  /**
   * Bascule Lecture / Pause
   */
  function togglePlay(forceState) {
    const nextState = typeof forceState === 'boolean' ? forceState : !state.isPlaying;

    // Si on est à la dernière étape et qu'on clique sur Lecture, repartir du début
    if (nextState && state.currentIndex === ERAS.length - 1) {
      selectEra(0, true);
    }

    state.isPlaying = nextState;
    state.autoplayElapsedMs = 0;

    btnPlay.setAttribute('aria-pressed', state.isPlaying ? 'true' : 'false');
    btnPlay.setAttribute(
      'aria-label',
      state.isPlaying ? 'Mettre en pause la lecture automatique (Espace)' : 'Lancer la lecture automatique (Espace)'
    );
    iconPlay.hidden = state.isPlaying;
    iconPause.hidden = !state.isPlaying;
    playLabel.textContent = state.isPlaying ? 'Pause' : 'Lecture';

    if (!state.isPlaying) {
      autoplayProgress.style.width = '0%';
    }
  }

  /**
   * Redimensionnement haute densité (Retina / HiDPI) du Canvas
   */
  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  /* ==========================================================================
     Moteur de rendu visuel spécifique à chacune des 13 ères
     ========================================================================== */

  function renderEraCanvas(now) {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const cx = w / 2;
    const cy = h / 2;
    const t = (now - state.eraStartTime) * 0.001; // temps en secondes depuis le début de l'ère
    const eraId = ERAS[state.currentIndex].id;

    ctx.clearRect(0, 0, w, h);

    switch (eraId) {
      case 'planck':
        drawPlanckEra(w, h, cx, cy, t);
        break;
      case 'gut':
        drawGutEra(w, h, cx, cy, t);
        break;
      case 'inflation':
        drawInflationEra(w, h, cx, cy, t);
        break;
      case 'electroweak':
        drawElectroweakEra(w, h, cx, cy, t);
        break;
      case 'quarks':
        drawQuarkEra(w, h, cx, cy, t);
        break;
      case 'hadrons':
        drawHadronEra(w, h, cx, cy, t);
        break;
      case 'leptons':
        drawLeptonEra(w, h, cx, cy, t);
        break;
      case 'nucleosynthesis':
        drawNucleosynthesisEra(w, h, cx, cy, t);
        break;
      case 'recombination':
        drawRecombinationEra(w, h, cx, cy, t);
        break;
      case 'dark_ages':
        drawDarkAgesEra(w, h, cx, cy, t);
        break;
      case 'first_stars':
        drawFirstStarsEra(w, h, cx, cy, t);
        break;
      case 'galaxies':
        drawGalaxiesEra(w, h, cx, cy, t);
        break;
      case 'today':
        drawTodayEra(w, h, cx, cy, t);
        break;
    }
  }

  // 1. Ère de Planck : mousse quantique incandescente et fluctuations d'espace-temps
  function drawPlanckEra(w, h, cx, cy, t) {
    const grad = ctx.createRadialGradient(cx, cy, 5, cx, cy, Math.max(w, h) * 0.65);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.25, '#e040fb');
    grad.addColorStop(0.6, '#311b92');
    grad.addColorStop(1, '#05020f');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Anneaux d'ondes gravitationnelles quantiques
    for (let i = 0; i < 7; i++) {
      const r = 18 + i * 22 + Math.sin(t * 6 + i) * 8;
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.45 - i * 0.05})`;
      ctx.lineWidth = 2;
      for (let a = 0; a <= Math.PI * 2 + 0.2; a += 0.2) {
        const jitter = Math.sin(a * 7 + t * 9 + i) * 6;
        const px = cx + Math.cos(a) * (r + jitter);
        const py = cy + Math.sin(a) * (r + jitter);
        if (a === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }

    // Bulles de mousse quantique éphémères
    state.particles.forEach((p, idx) => {
      const angle = p.angle + t * (idx % 2 === 0 ? 2.5 : -2.5);
      const dist = p.radius * Math.min(w, h) * 0.42;
      const x = cx + Math.cos(angle) * dist;
      const y = cy + Math.sin(angle) * dist;
      const pulse = 2 + Math.abs(Math.sin(t * 8 + p.phase)) * 5;

      ctx.beginPath();
      ctx.arc(x, y, pulse, 0, Math.PI * 2);
      ctx.fillStyle = idx % 2 === 0 ? '#ffffff' : '#ea80fc';
      ctx.fill();
    });
  }

  // 2. Ère de Grande Unification (GUT) : séparation de la gravité et symétrie GUT
  function drawGutEra(w, h, cx, cy, t) {
    const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(w, h) * 0.7);
    grad.addColorStop(0, '#fff8e1');
    grad.addColorStop(0.3, '#00b0ff');
    grad.addColorStop(0.75, '#0d1b3e');
    grad.addColorStop(1, '#040711');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Onde dorée représentant la gravité qui se détache
    const gravRadius = ((t * 55) % (Math.min(w, h) * 0.48)) + 25;
    ctx.beginPath();
    ctx.arc(cx, cy, gravRadius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 213, 79, 0.75)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Tri-symétrie de la force GUT (forte, faible, électromagnétique unifiées)
    for (let k = 0; k < 3; k++) {
      const lobeAngle = t * 1.6 + (k * Math.PI * 2) / 3;
      const lx = cx + Math.cos(lobeAngle) * 45;
      const ly = cy + Math.sin(lobeAngle) * 45;

      ctx.beginPath();
      ctx.arc(lx, ly, 36, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.7)';
      ctx.lineWidth = 2.5;
      ctx.stroke();
    }

    state.particles.forEach((p, i) => {
      const a = p.angle + t * 1.8;
      const r = (0.1 + p.radius * 0.8) * Math.min(w, h) * 0.43;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;
      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = i % 3 === 0 ? '#ffd54f' : '#00e5ff';
      ctx.fill();
    });
  }

  // 3. Inflation cosmique : grille d'espace-temps en dilatation exponentielle rapide
  function drawInflationEra(w, h, cx, cy, t) {
    ctx.fillStyle = '#050b18';
    ctx.fillRect(0, 0, w, h);

    // Grille radiale qui s'étire à grande vitesse
    const maxR = Math.hypot(w, h) * 0.6;
    ctx.strokeStyle = 'rgba(77, 208, 225, 0.28)';
    ctx.lineWidth = 1.2;

    for (let i = 0; i < 16; i++) {
      const a = (i * Math.PI * 2) / 16;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a) * maxR, cy + Math.sin(a) * maxR);
      ctx.stroke();
    }

    // Cercles concentriques en expansion exponentielle
    for (let j = 0; j < 8; j++) {
      const phase = (t * 1.3 + j / 8) % 1;
      const expR = Math.pow(phase, 2.6) * maxR;
      ctx.beginPath();
      ctx.arc(cx, cy, expR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(77, 208, 225, ${(1 - phase) * 0.85})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Fluctuations quantiques étirées à grande échelle
    state.particles.forEach((p) => {
      const phase = (t * 0.9 + p.radius) % 1;
      const dist = Math.pow(phase, 2.2) * maxR;
      const x = cx + Math.cos(p.angle) * dist;
      const y = cy + Math.sin(p.angle) * dist;
      ctx.beginPath();
      ctx.arc(x, y, 2 + phase * 5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 171, 64, ${1 - phase * 0.7})`;
      ctx.fill();
    });
  }

  // 4. Ère électrofaible : champ de Higgs et bosons W, Z, photons
  function drawElectroweakEra(w, h, cx, cy, t) {
    const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(w, h) * 0.7);
    grad.addColorStop(0, '#2a1650');
    grad.addColorStop(1, '#070818');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Maillage doré du champ de Higgs
    const step = 42;
    ctx.fillStyle = 'rgba(255, 215, 64, 0.25)';
    for (let x = step / 2; x < w; x += step) {
      for (let y = step / 2; y < h; y += step) {
        const r = 2 + Math.sin(t * 3 + (x + y) * 0.03) * 1.2;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Particules interagissant avec le champ de Higgs (halos de masse)
    state.particles.slice(0, 45).forEach((p, idx) => {
      p.x = (p.x + p.vx + 1) % 1;
      p.y = (p.y + p.vy + 1) % 1;
      const px = p.x * w;
      const py = p.y * h;

      // Halo d'interaction avec le champ de Higgs
      ctx.beginPath();
      ctx.arc(px, py, 9 + Math.sin(t * 5 + idx) * 2, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 215, 64, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = idx % 2 === 0 ? '#b388ff' : '#ffd740';
      ctx.fill();
    });
  }

  // 5. Ère des quarks : plasma quarks-gluons dense et libre
  function drawQuarkEra(w, h, cx, cy, t) {
    const grad = ctx.createRadialGradient(cx, cy, 20, cx, cy, Math.max(w, h) * 0.75);
    grad.addColorStop(0, '#4a121a');
    grad.addColorStop(1, '#0b0612');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    const colors = ['#ff5252', '#69f0ae', '#40c4ff']; // Charge de couleur QCD (rouge, vert, bleu)
    const active = state.particles.slice(0, 55);

    active.forEach((p) => {
      p.x = (p.x + p.vx * 1.8 + 1) % 1;
      p.y = (p.y + p.vy * 1.8 + 1) % 1;
    });

    // Tubes de flux de gluons entre quarks proches
    for (let i = 0; i < active.length; i++) {
      for (let j = i + 1; j < active.length; j++) {
        const dx = (active[i].x - active[j].x) * w;
        const dy = (active[i].y - active[j].y) * h;
        const dist = Math.hypot(dx, dy);
        if (dist < 68) {
          ctx.beginPath();
          ctx.moveTo(active[i].x * w, active[i].y * h);
          ctx.lineTo(active[j].x * w, active[j].y * h);
          ctx.strokeStyle = `rgba(105, 240, 174, ${(1 - dist / 68) * 0.55})`;
          ctx.lineWidth = 1.6;
          ctx.stroke();
        }
      }
    }

    // Quarks libres
    active.forEach((p, i) => {
      const px = p.x * w;
      const py = p.y * h;
      ctx.beginPath();
      ctx.arc(px, py, 4.5 + Math.sin(t * 6 + i) * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = colors[i % 3];
      ctx.fill();
    });
  }

  // 6. Ère des hadrons : confinement des quarks en triplets (protons et neutrons)
  function drawHadronEra(w, h, cx, cy, t) {
    ctx.fillStyle = '#090d1c';
    ctx.fillRect(0, 0, w, h);

    const hadronCount = 18;
    const quarkColors = ['#ff5252', '#69f0ae', '#40c4ff'];

    for (let i = 0; i < hadronCount; i++) {
      const p = state.particles[i];
      p.x = (p.x + p.vx * 0.8 + 1) % 1;
      p.y = (p.y + p.vy * 0.8 + 1) % 1;
      const hx = 40 + p.x * (w - 80);
      const hy = 40 + p.y * (h - 80);
      const isProton = i % 2 === 0;

      // Enveloppe du hadron (proton ou neutron)
      ctx.beginPath();
      ctx.arc(hx, hy, 16, 0, Math.PI * 2);
      ctx.fillStyle = isProton ? 'rgba(255, 112, 67, 0.22)' : 'rgba(144, 202, 249, 0.22)';
      ctx.fill();
      ctx.strokeStyle = isProton ? '#ff7043' : '#90caf9';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // 3 quarks confinés en rotation interne
      for (let q = 0; q < 3; q++) {
        const qa = t * 5 + i + (q * Math.PI * 2) / 3;
        const qx = hx + Math.cos(qa) * 7.5;
        const qy = hy + Math.sin(qa) * 7.5;
        ctx.beginPath();
        ctx.arc(qx, qy, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = quarkColors[q];
        ctx.fill();
      }
    }

    // Éclairs d'annihilation baryon-antibaryon
    for (let k = 0; k < 6; k++) {
      const fp = state.particles[30 + k];
      const fx = fp.x * w;
      const fy = fp.y * h;
      const pulse = Math.abs(Math.sin(t * 3 + k));
      ctx.beginPath();
      ctx.arc(fx, fy, 4 + pulse * 14, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 245, 157, ${(1 - pulse) * 0.7})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  // 7. Ère des leptons : électrons, positrons et découplage des neutrinos
  function drawLeptonEra(w, h, cx, cy, t) {
    ctx.fillStyle = '#070b19';
    ctx.fillRect(0, 0, w, h);

    // Neutrinos se propageant en ligne droite vers l'extérieur (découplage)
    state.particles.slice(0, 35).forEach((p) => {
      const phase = (t * 0.55 + p.radius) % 1;
      const dist = phase * Math.hypot(w, h) * 0.55;
      const nx = cx + Math.cos(p.angle) * dist;
      const ny = cy + Math.sin(p.angle) * dist;
      ctx.beginPath();
      ctx.arc(nx, ny, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(179, 136, 255, 0.75)';
      ctx.fill();
    });

    // Paires électron (e-) / positron (e+) en orbite et annihilation
    state.particles.slice(35, 65).forEach((p, idx) => {
      const bx = (0.12 + p.x * 0.76) * w;
      const by = (0.15 + p.y * 0.7) * h;
      const a = t * 4 + idx;
      const r = 10 + Math.sin(t * 2 + idx) * 5;

      // Électron
      ctx.beginPath();
      ctx.arc(bx + Math.cos(a) * r, by + Math.sin(a) * r, 3.8, 0, Math.PI * 2);
      ctx.fillStyle = '#40c4ff';
      ctx.fill();

      // Positron
      ctx.beginPath();
      ctx.arc(bx - Math.cos(a) * r, by - Math.sin(a) * r, 3.8, 0, Math.PI * 2);
      ctx.fillStyle = '#ff80ab';
      ctx.fill();
    });
  }

  // 8. Nucléosynthèse primordiale : 75% Hydrogène (p) et 25% Hélium-4 (2p + 2n) en masse
  function drawNucleosynthesisEra(w, h, cx, cy, t) {
    const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(w, h) * 0.75);
    grad.addColorStop(0, '#2b1510');
    grad.addColorStop(1, '#080a16');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Noyaux d'Hydrogène ¹H (protons isolés — 75% de la masse baryonique)
    state.particles.slice(0, 48).forEach((p) => {
      p.x = (p.x + p.vx * 0.7 + 1) % 1;
      p.y = (p.y + p.vy * 0.7 + 1) % 1;
      const px = p.x * w;
      const py = p.y * h;

      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#ff5252';
      ctx.fill();
    });

    // Noyaux d'Hélium-4 (2 protons + 2 neutrons liés — 25% de la masse baryonique)
    state.particles.slice(48, 60).forEach((p, idx) => {
      p.x = (p.x + p.vx * 0.45 + 1) % 1;
      p.y = (p.y + p.vy * 0.45 + 1) % 1;
      const hx = 40 + p.x * (w - 80);
      const hy = 40 + p.y * (h - 80);

      // Halo doré de liaison nucléaire
      ctx.beginPath();
      ctx.arc(hx, hy, 14, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 213, 79, 0.2)';
      ctx.fill();

      const offsets = [
        [-4.2, -4.2, '#ff5252'],
        [4.2, 4.2, '#ff5252'],
        [-4.2, 4.2, '#90caf9'],
        [4.2, -4.2, '#90caf9']
      ];
      offsets.forEach(([ox, oy, col]) => {
        const rot = t * 2 + idx;
        const rx = ox * Math.cos(rot) - oy * Math.sin(rot);
        const ry = ox * Math.sin(rot) + oy * Math.cos(rot);
        ctx.beginPath();
        ctx.arc(hx + rx, hy + ry, 4.2, 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.fill();
      });
    });

    // Bandeau de jauge visuelle 75% H / 25% He en masse
    const barW = Math.min(260, w * 0.65);
    const barH = 10;
    const bx = cx - barW / 2;
    const by = h - 48;
    ctx.fillStyle = '#ff5252';
    ctx.fillRect(bx, by, barW * 0.75, barH);
    ctx.fillStyle = '#ffd54f';
    ctx.fillRect(bx + barW * 0.75, by, barW * 0.25, barH);
    ctx.fillStyle = '#ffffff';
    ctx.font = '600 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('75 % H (masse)  |  25 % ⁴He (masse)', cx, by - 6);
  }

  // 9. Recombinaison & Fond Diffus Cosmologique (~380 000 ans, ~3000 K)
  function drawRecombinationEra(w, h, cx, cy, t) {
    // Fond évoquant les anisotropies thermiques du CMB (~3000 K)
    const grad = ctx.createRadialGradient(cx, cy, 15, cx, cy, Math.max(w, h) * 0.7);
    grad.addColorStop(0, '#3e2723');
    grad.addColorStop(0.55, '#1a237e');
    grad.addColorStop(1, '#070b1a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Atomes neutres (noyau + électron en orbite liée)
    state.particles.slice(0, 22).forEach((p, idx) => {
      const ax = 35 + p.x * (w - 70);
      const ay = 35 + p.y * (h - 70);

      // Orbite électronique
      ctx.beginPath();
      ctx.arc(ax, ay, 12, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(128, 222, 234, 0.45)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Noyau
      ctx.beginPath();
      ctx.arc(ax, ay, 3.8, 0, Math.PI * 2);
      ctx.fillStyle = '#ff7043';
      ctx.fill();

      // Électron capturé
      const ea = t * 3.5 + idx;
      ctx.beginPath();
      ctx.arc(ax + Math.cos(ea) * 12, ay + Math.sin(ea) * 12, 2.3, 0, Math.PI * 2);
      ctx.fillStyle = '#80deea';
      ctx.fill();
    });

    // Photons du Fond Diffus Cosmologique (CMB) voyageant enfin en ligne droite
    state.particles.slice(22, 65).forEach((p) => {
      p.x = (p.x + Math.cos(p.angle) * 0.004 + 1) % 1;
      p.y = (p.y + Math.sin(p.angle) * 0.004 + 1) % 1;
      const px = p.x * w;
      const py = p.y * h;

      ctx.beginPath();
      ctx.arc(px, py, 2.6, 0, Math.PI * 2);
      ctx.fillStyle = '#ffb74d';
      ctx.fill();
    });
  }

  // 10. Âges sombres : obscurité cosmique, filaments de matière noire et gaz neutre
  function drawDarkAgesEra(w, h, cx, cy, t) {
    ctx.fillStyle = '#03040a';
    ctx.fillRect(0, 0, w, h);

    const nodes = state.particles.slice(0, 36);

    // Filaments subtils de matière noire
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = (nodes[i].x - nodes[j].x) * w;
        const dy = (nodes[i].y - nodes[j].y) * h;
        const dist = Math.hypot(dx, dy);
        if (dist < 95) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x * w, nodes[i].y * h);
          ctx.lineTo(nodes[j].x * w, nodes[j].y * h);
          ctx.strokeStyle = `rgba(92, 107, 192, ${(1 - dist / 95) * 0.32})`;
          ctx.lineWidth = 1.4;
          ctx.stroke();
        }
      }
    }

    // Halos sombres et ondes radio 21 cm de l'hydrogène neutre
    nodes.forEach((p, i) => {
      const nx = p.x * w;
      const ny = p.y * h;
      const pulse = (t * 0.6 + i * 0.2) % 1;

      ctx.beginPath();
      ctx.arc(nx, ny, pulse * 22, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(120, 144, 156, ${(1 - pulse) * 0.28})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(nx, ny, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#5c6bc0';
      ctx.fill();
    });
  }

  // 11. Premières étoiles (Population III) : géantes bleues et bulles de réionisation
  function drawFirstStarsEra(w, h, cx, cy, t) {
    ctx.fillStyle = '#040714';
    ctx.fillRect(0, 0, w, h);

    const stars = state.particles.slice(0, 9);
    stars.forEach((s, idx) => {
      const sx = (0.15 + s.x * 0.7) * w;
      const sy = (0.18 + s.y * 0.64) * h;
      const ionRadius = 28 + Math.sin(t * 1.5 + idx) * 8 + idx * 3;

      // Bulle de réionisation UV autour de l'étoile primordiale
      const glow = ctx.createRadialGradient(sx, sy, 2, sx, sy, ionRadius * 1.4);
      glow.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      glow.addColorStop(0.3, 'rgba(128, 216, 255, 0.55)');
      glow.addColorStop(0.75, 'rgba(234, 128, 252, 0.15)');
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(sx, sy, ionRadius * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // Aigrettes de diffraction stellaire
      ctx.strokeStyle = 'rgba(224, 247, 250, 0.8)';
      ctx.lineWidth = 1.3;
      const spike = 12 + Math.sin(t * 4 + idx) * 3;
      ctx.beginPath();
      ctx.moveTo(sx - spike, sy);
      ctx.lineTo(sx + spike, sy);
      ctx.moveTo(sx, sy - spike);
      ctx.lineTo(sx, sy + spike);
      ctx.stroke();
    });
  }

  // 12. Galaxies (~400 Ma à 1 Ga) : galaxies spirales en rotation et assemblage
  function drawGalaxiesEra(w, h, cx, cy, t) {
    ctx.fillStyle = '#040611';
    ctx.fillRect(0, 0, w, h);

    const galaxyCenters = [
      { x: cx - w * 0.18, y: cy - h * 0.06, scale: 1.0, speed: 0.9 },
      { x: cx + w * 0.2, y: cy + h * 0.08, scale: 0.78, speed: -1.1 }
    ];

    galaxyCenters.forEach((g) => {
      // Halo du bulbe galactique
      const bulge = ctx.createRadialGradient(g.x, g.y, 2, g.x, g.y, 75 * g.scale);
      bulge.addColorStop(0, '#fff8e1');
      bulge.addColorStop(0.25, 'rgba(255, 209, 128, 0.65)');
      bulge.addColorStop(0.65, 'rgba(130, 177, 255, 0.18)');
      bulge.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bulge;
      ctx.beginPath();
      ctx.arc(g.x, g.y, 75 * g.scale, 0, Math.PI * 2);
      ctx.fill();
    });

    // Étoiles réparties sur les bras spiraux
    state.particles.forEach((p, idx) => {
      const g = galaxyCenters[idx % 2];
      const armOffset = (p.arm * Math.PI * 2) / 3;
      const r = (8 + p.radius * 78) * g.scale;
      const theta = armOffset + p.radius * 4.2 + t * g.speed;
      const x = g.x + Math.cos(theta) * r;
      const y = g.y + Math.sin(theta) * r * 0.68;

      ctx.beginPath();
      ctx.arc(x, y, p.radius < 0.3 ? 2.2 : 1.6, 0, Math.PI * 2);
      ctx.fillStyle = p.radius < 0.35 ? '#ffd180' : '#82b1ff';
      ctx.fill();
    });
  }

  // 13. Aujourd'hui (13,8 Ga, 2,725 K) : toile cosmique, galaxies et système planétaire
  function drawTodayEra(w, h, cx, cy, t) {
    ctx.fillStyle = '#03050d';
    ctx.fillRect(0, 0, w, h);

    // Toile cosmique en arrière-plan
    const webNodes = state.particles.slice(0, 42);
    for (let i = 0; i < webNodes.length; i++) {
      for (let j = i + 1; j < webNodes.length; j++) {
        const dx = (webNodes[i].x - webNodes[j].x) * w;
        const dy = (webNodes[i].y - webNodes[j].y) * h;
        const d = Math.hypot(dx, dy);
        if (d < 85) {
          ctx.beginPath();
          ctx.moveTo(webNodes[i].x * w, webNodes[i].y * h);
          ctx.lineTo(webNodes[j].x * w, webNodes[j].y * h);
          ctx.strokeStyle = `rgba(100, 255, 218, ${(1 - d / 85) * 0.25})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      }
    }

    webNodes.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x * w, p.y * h, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = '#64ffda';
      ctx.fill();
    });

    // Système stellaire et planétaire au centre (représentant le Système solaire)
    const sunGlow = ctx.createRadialGradient(cx, cy, 3, cx, cy, 34);
    sunGlow.addColorStop(0, '#ffffff');
    sunGlow.addColorStop(0.4, '#ffd740');
    sunGlow.addColorStop(1, 'rgba(255, 215, 64, 0)');
    ctx.fillStyle = sunGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, 34, 0, Math.PI * 2);
    ctx.fill();

    const orbits = [
      { r: 42, speed: 1.5, color: '#ffab91', size: 3 },
      { r: 68, speed: 0.95, color: '#4fc3f7', size: 4.5 },
      { r: 98, speed: 0.55, color: '#ffd54f', size: 6 }
    ];

    orbits.forEach((orb, idx) => {
      ctx.beginPath();
      ctx.arc(cx, cy, orb.r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
      ctx.lineWidth = 1;
      ctx.stroke();

      const pa = t * orb.speed + idx * 2.1;
      const px = cx + Math.cos(pa) * orb.r;
      const py = cy + Math.sin(pa) * orb.r;
      ctx.beginPath();
      ctx.arc(px, py, orb.size, 0, Math.PI * 2);
      ctx.fillStyle = orb.color;
      ctx.fill();
    });
  }

  /**
   * Boucle d'animation principale (requestAnimationFrame)
   */
  function animate(now) {
    const dt = now - state.lastFrameTime;
    state.lastFrameTime = now;

    // Gestion de la lecture automatique
    if (state.isPlaying) {
      state.autoplayElapsedMs += dt;
      const ratio = Math.min(1, state.autoplayElapsedMs / state.autoplayDurationMs);
      autoplayProgress.style.width = `${ratio * 100}%`;

      if (state.autoplayElapsedMs >= state.autoplayDurationMs) {
        if (state.currentIndex < ERAS.length - 1) {
          selectEra(state.currentIndex + 1, true);
        } else {
          togglePlay(false);
        }
      }
    }

    renderEraCanvas(now);
    requestAnimationFrame(animate);
  }

  /**
   * Écouteurs d'événements (Boutons, Clavier, Redimensionnement)
   */
  function bindEvents() {
    btnPrev.addEventListener('click', () => {
      selectEra(state.currentIndex - 1, true);
    });

    btnNext.addEventListener('click', () => {
      selectEra(state.currentIndex + 1, true);
    });

    btnPlay.addEventListener('click', () => {
      togglePlay();
    });

    // Navigation clavier (Flèches gauche/droite, Barre d'espace)
    window.addEventListener('keydown', (e) => {
      // Ignorer si l'utilisateur tape dans un champ de saisie
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        selectEra(state.currentIndex - 1, true);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        selectEra(state.currentIndex + 1, true);
      } else if (e.key === ' ' || e.code === 'Space') {
        // Si le focus est déjà sur un bouton, laisser le comportement natif ou basculer la lecture
        if (document.activeElement?.tagName !== 'BUTTON') {
          e.preventDefault();
          togglePlay();
        }
      }
    });

    window.addEventListener('resize', resizeCanvas);
  }

  // Initialisation au chargement
  function init() {
    buildLogTimeline();
    bindEvents();
    resizeCanvas();
    selectEra(0, true);
    requestAnimationFrame(animate);
  }

  init();
})();
