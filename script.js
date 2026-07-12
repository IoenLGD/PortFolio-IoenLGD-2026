'use strict';

/* ── Lang ── */
let lang = localStorage.getItem('lgd-lang') || 'fr';

/* Dictionnaire de traductions supplémentaires (ES/DE/PT/IT/BR/SV/NL/PL).
   Clé = texte data-fr exact. Si une langue/texte n'a pas d'entrée ici,
   on retombe automatiquement sur l'anglais (data-en) puis sur le français. */
const TRANSLATIONS = {
  "À propos": {es:"Sobre mí",de:"Über mich",pt:"Sobre mim",it:"Chi sono",br:"Diwar-benn",sv:"Om mig",nl:"Over mij",pl:"O mnie"},
  "Compétences": {es:"Habilidades",de:"Fähigkeiten",pt:"Competências",it:"Competenze",br:"Barregezhioù",sv:"Kompetenser",nl:"Vaardigheden",pl:"Umiejętności"},
  "Parcours": {es:"Trayectoria",de:"Werdegang",pt:"Percurso",it:"Percorso",br:"Hent",sv:"Resa",nl:"Traject",pl:"Ścieżka"},
  "Projets": {es:"Proyectos",de:"Projekte",pt:"Projetos",it:"Progetti",br:"Raktresoù",sv:"Projekt",nl:"Projecten",pl:"Projekty"},
  "Contact": {es:"Contacto",de:"Kontakt",pt:"Contato",it:"Contatto",br:"Darempred",sv:"Kontakt",nl:"Contact",pl:"Kontakt"},
  "CV": {es:"CV",de:"Lebenslauf",pt:"CV",it:"CV",br:"CV",sv:"CV",nl:"CV",pl:"CV"},
  "Veille": {es:"Vigilancia",de:"Technologiebeobachtung",pt:"Vigilância",it:"Osservatorio",br:"Gward",sv:"Bevakning",nl:"Watch",pl:"Obserwacja"},
  "BTS SIO · SISR · 2ᵉ année": {es:"BTS SIO · SISR · 2º año",de:"BTS SIO · SISR · 2. Jahr",pt:"BTS SIO · SISR · 2º ano",it:"BTS SIO · SISR · 2° anno",br:"BTS SIO · SISR · 2vet bloavezh",sv:"BTS SIO · SISR · år 2",nl:"BTS SIO · SISR · 2e jaar",pl:"BTS SIO · SISR · 2. rok"},
  "Administration systèmes & réseaux · Supervision IT": {es:"Administración de sistemas y redes · Supervisión IT",de:"Systeme & Netzwerkadministration · IT-Überwachung",pt:"Administração de sistemas e redes · Supervisão de TI",it:"Amministrazione di sistemi e reti · Supervisione IT",br:"Merañ reizhiadoù & rouedadoù · Gward IT",sv:"Systemadministration & nätverk · IT-övervakning",nl:"Systeem- & netwerkbeheer · IT-monitoring",pl:"Administracja systemami i sieciami · Nadzór IT"},
  "Mes projets": {es:"Mis proyectos",de:"Meine Projekte",pt:"Meus projetos",it:"I miei progetti",br:"Ma raktresoù",sv:"Mina projekt",nl:"Mijn projecten",pl:"Moje projekty"},
  "Me contacter": {es:"Contactarme",de:"Kontaktiere mich",pt:"Fale comigo",it:"Contattami",br:"Darempred ganin",sv:"Kontakta mig",nl:"Neem contact op",pl:"Skontaktuj się"},
  "Qui suis-je": {es:"Quién soy",de:"Wer ich bin",pt:"Quem sou eu",it:"Chi sono",br:"Piv on-me",sv:"Vem jag är",nl:"Wie ik ben",pl:"Kim jestem"},
  "Systèmes & Réseaux": {es:"Sistemas y Redes",de:"Systeme & Netzwerke",pt:"Sistemas e Redes",it:"Sistemi e Reti",br:"Reizhiadoù & Rouedadoù",sv:"System & Nätverk",nl:"Systemen & Netwerken",pl:"Systemy i Sieci"},
  "Installation, configuration et maintenance d'infrastructures IT. Gestion des utilisateurs via Active Directory.": {es:"Instalación, configuración y mantenimiento de infraestructuras IT. Gestión de usuarios mediante Active Directory.",de:"Installation, Konfiguration und Wartung von IT-Infrastrukturen. Benutzerverwaltung über Active Directory.",pt:"Instalação, configuração e manutenção de infraestruturas de TI. Gestão de utilizadores via Active Directory.",it:"Installazione, configurazione e manutenzione di infrastrutture IT. Gestione utenti tramite Active Directory.",br:"Staliañ, kefluniañ ha diazezañ savadurioù IT. Merañ implijerien dre Active Directory.",sv:"Installation, konfiguration och underhåll av IT-infrastruktur. Användarhantering via Active Directory.",nl:"Installatie, configuratie en onderhoud van IT-infrastructuren. Gebruikersbeheer via Active Directory.",pl:"Instalacja, konfiguracja i utrzymanie infrastruktury IT. Zarządzanie użytkownikami przez Active Directory."},
  "Supervision IT": {es:"Supervisión IT",de:"IT-Überwachung",pt:"Supervisão de TI",it:"Supervisione IT",br:"Gward IT",sv:"IT-övervakning",nl:"IT-monitoring",pl:"Nadzór IT"},
  "GLPI, Zabbix, PRTG — surveillance des équipements, analyse des performances, anticipation des incidents.": {es:"GLPI, Zabbix, PRTG — supervisión de equipos, análisis de rendimiento, anticipación de incidentes.",de:"GLPI, Zabbix, PRTG — Geräteüberwachung, Leistungsanalyse, Vorbeugung von Störungen.",pt:"GLPI, Zabbix, PRTG — monitorização de equipamentos, análise de desempenho, antecipação de incidentes.",it:"GLPI, Zabbix, PRTG — monitoraggio delle apparecchiature, analisi delle prestazioni, prevenzione degli incidenti.",br:"GLPI, Zabbix, PRTG — gward an trevnadoù, dielfennañ ar performiadoù, diwall ar gwallzarvoudoù.",sv:"GLPI, Zabbix, PRTG — övervakning av utrustning, prestandaanalys, förebyggande av incidenter.",nl:"GLPI, Zabbix, PRTG — apparatuurbewaking, prestatieanalyse, incidentpreventie.",pl:"GLPI, Zabbix, PRTG — monitorowanie sprzętu, analiza wydajności, zapobieganie incydentom."},
  "Support & Déploiement": {es:"Soporte y Despliegue",de:"Support & Bereitstellung",pt:"Suporte e Implantação",it:"Supporto e Distribuzione",br:"Skoazell & Displegañ",sv:"Support & Distribution",nl:"Ondersteuning & Implementatie",pl:"Wsparcie i Wdrożenia"},
  "Diagnostic réseau/système, déploiement et sécurisation des postes et serveurs en milieu professionnel.": {es:"Diagnóstico de red/sistema, despliegue y protección de puestos y servidores en entorno profesional.",de:"Netzwerk-/Systemdiagnose, Bereitstellung und Absicherung von Arbeitsplätzen und Servern im beruflichen Umfeld.",pt:"Diagnóstico de rede/sistema, implantação e proteção de postos e servidores em ambiente profissional.",it:"Diagnosi di rete/sistema, distribuzione e protezione di postazioni e server in ambito professionale.",br:"Diagnostik rouedad/reizhiad, displegañ ha diogeliñ ar postoù hag ar servijerien en ur bern micherel.",sv:"Nätverks-/systemdiagnostik, distribution och skydd av arbetsstationer och servrar i en professionell miljö.",nl:"Netwerk-/systeemdiagnose, implementatie en beveiliging van werkstations en servers in een professionele omgeving.",pl:"Diagnostyka sieci/systemu, wdrażanie i zabezpieczanie stanowisk i serwerów w środowisku zawodowym."},
  "Expertise": {es:"Experiencia",de:"Expertise",pt:"Especialização",it:"Competenza",br:"Barregezh",sv:"Expertis",nl:"Expertise",pl:"Ekspertyza"},
  "Réseau & Systèmes": {es:"Red y Sistemas",de:"Netzwerk & Systeme",pt:"Rede e Sistemas",it:"Rete e Sistemi",br:"Rouedad & Reizhiadoù",sv:"Nätverk & System",nl:"Netwerk & Systemen",pl:"Sieć i Systemy"},
  "Linux & Serveurs": {es:"Linux y Servidores",de:"Linux & Server",pt:"Linux e Servidores",it:"Linux e Server",br:"Linux & Servijerien",sv:"Linux & Servrar",nl:"Linux & Servers",pl:"Linux i Serwery"},
  "Développement": {es:"Desarrollo",de:"Entwicklung",pt:"Desenvolvimento",it:"Sviluppo",br:"Diorren",sv:"Utveckling",nl:"Ontwikkeling",pl:"Programowanie"},
  "Mon histoire": {es:"Mi historia",de:"Meine Geschichte",pt:"Minha história",it:"La mia storia",br:"Ma istor",sv:"Min historia",nl:"Mijn verhaal",pl:"Moja historia"},
  "BTS SIO – Option SISR": {es:"BTS SIO – Opción SISR",de:"BTS SIO – Option SISR",pt:"BTS SIO – Opção SISR",it:"BTS SIO – Opzione SISR",br:"BTS SIO – Dibab SISR",sv:"BTS SIO – Inriktning SISR",nl:"BTS SIO – Optie SISR",pl:"BTS SIO – Specjalizacja SISR"},
  "Formation en administration systèmes, réseaux et supervision IT. Obtenu en 2026.": {es:"Formación en administración de sistemas, redes y supervisión IT. Obtenido en 2026.",de:"Ausbildung in Systemadministration, Netzwerken und IT-Überwachung. Abschluss 2026.",pt:"Formação em administração de sistemas, redes e supervisão de TI. Obtido em 2026.",it:"Formazione in amministrazione di sistemi, reti e supervisione IT. Conseguito nel 2026.",br:"Deskadurezh e merañ reizhiadoù, rouedadoù ha gward IT. Bet en 2026.",sv:"Utbildning i systemadministration, nätverk och IT-övervakning. Erhållen 2026.",nl:"Opleiding in systeembeheer, netwerken en IT-monitoring. Behaald in 2026.",pl:"Kształcenie w zakresie administracji systemami, sieciami i nadzoru IT. Uzyskane w 2026 roku."},
  "Stages Réseaux Informatiques": {es:"Prácticas en Redes Informáticas",de:"Praktika IT-Netzwerke",pt:"Estágios em Redes Informáticas",it:"Tirocini in Reti Informatiche",br:"Stajoù Rouedadoù Kompoterel",sv:"Praktik i datanätverk",nl:"Stages IT-netwerken",pl:"Praktyki w zakresie sieci komputerowych"},
  "Déploiement PRTG, serveur physique, WSUS. Changement de matériel réseau en milieu scolaire réel.": {es:"Despliegue de PRTG, servidor físico, WSUS. Cambio de material de red en un entorno escolar real.",de:"PRTG-Einführung, physischer Server, WSUS. Austausch von Netzwerkhardware in einer echten Schulumgebung.",pt:"Implantação de PRTG, servidor físico, WSUS. Substituição de material de rede num ambiente escolar real.",it:"Distribuzione di PRTG, server fisico, WSUS. Sostituzione di materiale di rete in un ambiente scolastico reale.",br:"Displegañ PRTG, servijer fizikel, WSUS. Cheñch ar poellad rouedad en ul lec'h skol gwir.",sv:"Driftsättning av PRTG, fysisk server, WSUS. Byte av nätverksutrustning i en verklig skolmiljö.",nl:"Uitrol van PRTG, fysieke server, WSUS. Vervanging van netwerkapparatuur in een echte schoolomgeving.",pl:"Wdrożenie PRTG, serwer fizyczny, WSUS. Wymiana sprzętu sieciowego w rzeczywistym środowisku szkolnym."},
  "Bac Pro MELEC": {es:"Bachillerato Profesional MELEC",de:"Berufsabitur MELEC",pt:"Bacharelato Profissional MELEC",it:"Diploma Professionale MELEC",br:"Bac Pro MELEC",sv:"Yrkesgymnasium MELEC",nl:"Beroepsdiploma MELEC",pl:"Bac Zawodowy MELEC"},
  "Obtenu en 2024. Électricité tertiaire et industrielle, domotique.": {es:"Obtenido en 2024. Electricidad terciaria e industrial, domótica.",de:"Abschluss 2024. Tertiär- und Industrieelektrik, Hausautomation.",pt:"Obtido em 2024. Eletricidade terciária e industrial, domótica.",it:"Conseguito nel 2024. Elettricità terziaria e industriale, domotica.",br:"Bet en 2024. Tredydelezh hag industriel, kartouarezh ti.",sv:"Erhållen 2024. El för kontor och industri, hemautomation.",nl:"Behaald in 2024. Tertiaire en industriële elektriciteit, domotica.",pl:"Uzyskane w 2024 roku. Elektryka usługowa i przemysłowa, automatyka domowa."},
  "Stages Électricité Industrielle": {es:"Prácticas en Electricidad Industrial",de:"Praktika Industrieelektrik",pt:"Estágios em Eletricidade Industrial",it:"Tirocini in Elettricità Industriale",br:"Stajoù Tredan Industriel",sv:"Praktik i industriell el",nl:"Stages Industriële Elektriciteit",pl:"Praktyki z elektryki przemysłowej"},
  "Montage de tapis roulants, armoires électriques. Maintenance électrique des machines.": {es:"Montaje de cintas transportadoras, armarios eléctricos. Mantenimiento eléctrico de máquinas.",de:"Montage von Förderbändern, Schaltschränken. Elektrische Wartung von Maschinen.",pt:"Montagem de tapetes rolantes, quadros elétricos. Manutenção elétrica de máquinas.",it:"Montaggio di nastri trasportatori, quadri elettrici. Manutenzione elettrica delle macchine.",br:"Kevreañ tapisoù ruilhañ, kabinedoù tredan. Diazezañ tredanel ar veskerezhioù.",sv:"Montering av transportband, elskåp. Elunderhåll av maskiner.",nl:"Montage van transportbanden, elektrische kasten. Elektrisch onderhoud van machines.",pl:"Montaż przenośników taśmowych, szaf elektrycznych. Konserwacja elektryczna maszyn."},
  "Stage Électricité Industrielle": {es:"Práctica en Electricidad Industrial",de:"Praktikum Industrieelektrik",pt:"Estágio em Eletricidade Industrial",it:"Tirocinio in Elettricità Industriale",br:"Staj Tredan Industriel",sv:"Praktik i industriell el",nl:"Stage Industriële Elektriciteit",pl:"Praktyka z elektryki przemysłowej"},
  "Manutention générale du matériel électrique de tout le site.": {es:"Manipulación general del material eléctrico de todo el sitio.",de:"Allgemeine Handhabung der elektrischen Ausrüstung des gesamten Standorts.",pt:"Manuseamento geral do material elétrico de todo o local.",it:"Movimentazione generale del materiale elettrico dell'intero sito.",br:"Dougen hollek an daol dredan eus al lec'h a-bezh.",sv:"Allmän hantering av elmaterial för hela anläggningen.",nl:"Algemene behandeling van elektrisch materiaal van de hele site.",pl:"Ogólna obsługa materiału elektrycznego całego zakładu."},
  "Stages Électricité Bâtiment": {es:"Prácticas en Electricidad de Edificios",de:"Praktika Gebäudeelektrik",pt:"Estágios em Eletricidade de Edifícios",it:"Tirocini in Elettricità Edile",br:"Stajoù Tredan Savadurioù",sv:"Praktik i byggnadsel",nl:"Stages Elektriciteit Gebouwen",pl:"Praktyki z elektryki budowlanej"},
  "Câblage de maisons, appartements, magasins et usines sur 3 stages.": {es:"Cableado de casas, apartamentos, tiendas y fábricas durante 3 prácticas.",de:"Verkabelung von Häusern, Wohnungen, Geschäften und Fabriken über 3 Praktika.",pt:"Cablagem de casas, apartamentos, lojas e fábricas ao longo de 3 estágios.",it:"Cablaggio di case, appartamenti, negozi e fabbriche in 3 tirocini.",br:"Kabliñ tiez, apartamantoù, stalioù ha melioù e-pad 3 staj.",sv:"Kabeldragning i hus, lägenheter, butiker och fabriker under 3 praktikperioder.",nl:"Bekabeling van huizen, appartementen, winkels en fabrieken tijdens 3 stages.",pl:"Okablowanie domów, mieszkań, sklepów i fabryk podczas 3 praktyk."},
  "Réalisations": {es:"Realizaciones",de:"Arbeiten",pt:"Realizações",it:"Realizzazioni",br:"Oberoù",sv:"Arbeten",nl:"Realisaties",pl:"Realizacje"},
  "Projets Techniques": {es:"Proyectos Técnicos",de:"Technische Projekte",pt:"Projetos Técnicos",it:"Progetti Tecnici",br:"Raktresoù Teknikel",sv:"Tekniska projekt",nl:"Technische Projecten",pl:"Projekty Techniczne"},
  "Supervision réseau complète en stage réel : découverte auto, capteurs, alertes.": {es:"Supervisión de red completa en una práctica real: descubrimiento automático, sensores, alertas.",de:"Vollständige Netzwerküberwachung in einem echten Praktikum: Auto-Discovery, Sensoren, Warnmeldungen.",pt:"Supervisão de rede completa num estágio real: descoberta automática, sensores, alertas.",it:"Supervisione di rete completa in un tirocinio reale: rilevamento automatico, sensori, avvisi.",br:"Gward rouedad klok en ur staj gwir: dizoloadenn emgefre, kizidikerien, kemenn.",sv:"Fullständig nätverksövervakning i en verklig praktik: automatisk identifiering, sensorer, larm.",nl:"Volledige netwerkmonitoring tijdens een echte stage: auto-discovery, sensoren, meldingen.",pl:"Pełny nadzór sieci podczas rzeczywistej praktyki: automatyczne wykrywanie, czujniki, alerty."},
  "Domaine AD, OU, groupes, GPO et profils itinérants sous VirtualBox.": {es:"Dominio AD, UO, grupos, GPO y perfiles móviles en VirtualBox.",de:"AD-Domäne, OUs, Gruppen, GPOs und servergespeicherte Profile unter VirtualBox.",pt:"Domínio AD, UO, grupos, GPO e perfis móveis no VirtualBox.",it:"Dominio AD, OU, gruppi, GPO e profili mobili su VirtualBox.",br:"Domani AD, OU, strolladoù, GPO ha profiloù bale dindan VirtualBox.",sv:"AD-domän, OU, grupper, GPO och roaming-profiler i VirtualBox.",nl:"AD-domein, OU's, groepen, GPO's en zwervende profielen onder VirtualBox.",pl:"Domena AD, OU, grupy, GPO i profile mobilne w VirtualBox."},
  "Installation Debian 13 + scénario de surveillance web avec déclencheurs.": {es:"Instalación de Debian 13 + escenario de monitorización web con desencadenadores.",de:"Debian-13-Installation + Web-Überwachungsszenario mit Triggern.",pt:"Instalação do Debian 13 + cenário de monitorização web com gatilhos.",it:"Installazione di Debian 13 + scenario di monitoraggio web con trigger.",br:"Staliadur Debian 13 + senario gward web gant sturiadoù.",sv:"Installation av Debian 13 + webbövervakningsscenario med utlösare.",nl:"Installatie van Debian 13 + webmonitoringscenario met triggers.",pl:"Instalacja Debiana 13 + scenariusz monitorowania sieci z wyzwalaczami."},
  "Gestion de parc et ticketing sur Debian 12 avec stack LAMP sécurisée.": {es:"Gestión de parque y tickets en Debian 12 con pila LAMP segura.",de:"Bestandsverwaltung und Ticketing auf Debian 12 mit gesichertem LAMP-Stack.",pt:"Gestão de parque e ticketing em Debian 12 com stack LAMP segura.",it:"Gestione del parco e ticketing su Debian 12 con stack LAMP sicuro.",br:"Merañ ar parkad ha ticedoù war Debian 12 gant ur stag LAMP diogel.",sv:"Utrustningshantering och ärendehantering på Debian 12 med säker LAMP-stack.",nl:"Assetbeheer en ticketing op Debian 12 met beveiligde LAMP-stack.",pl:"Zarządzanie zasobami i zgłoszeniami na Debianie 12 z zabezpieczonym stosem LAMP."},
  "Serveur web complet sous Debian avec SSH et configuration réseau.": {es:"Servidor web completo en Debian con SSH y configuración de red.",de:"Vollständiger Webserver unter Debian mit SSH und Netzwerkkonfiguration.",pt:"Servidor web completo em Debian com SSH e configuração de rede.",it:"Server web completo su Debian con SSH e configurazione di rete.",br:"Servijer web klok dindan Debian gant SSH ha kefluniadur rouedad.",sv:"Komplett webbserver på Debian med SSH och nätverkskonfiguration.",nl:"Volledige webserver op Debian met SSH en netwerkconfiguratie.",pl:"Kompletny serwer WWW na Debianie z SSH i konfiguracją sieci."},
  "Veille Technologique": {es:"Vigilancia Tecnológica",de:"Technologiebeobachtung",pt:"Vigilância Tecnológica",it:"Osservatorio Tecnologico",br:"Gward Teknologel",sv:"Teknikbevakning",nl:"Technologische Watch",pl:"Obserwacja Technologiczna"},
  "Suivi des évolutions dans le domaine des réseaux et de la cybersécurité.": {es:"Seguimiento de las novedades en redes y ciberseguridad.",de:"Verfolgung der Entwicklungen im Bereich Netzwerke und Cybersicherheit.",pt:"Acompanhamento das evoluções na área de redes e cibersegurança.",it:"Monitoraggio degli sviluppi nel campo delle reti e della cybersicurezza.",br:"Heuliañ an emdroadurioù e maez ar rouedadoù hag ar cyberdiogelroez.",sv:"Uppföljning av utvecklingen inom nätverk och cybersäkerhet.",nl:"Opvolging van ontwikkelingen op het gebied van netwerken en cyberbeveiliging.",pl:"Śledzenie zmian w dziedzinie sieci i cyberbezpieczeństwa."},
  "Travaillons ensemble": {es:"Trabajemos juntos",de:"Lass uns zusammenarbeiten",pt:"Vamos trabalhar juntos",it:"Lavoriamo insieme",br:"Labouromp asambles",sv:"Låt oss samarbeta",nl:"Laten we samenwerken",pl:"Popracujmy razem"},
  "Mes coordonnées": {es:"Mis datos de contacto",de:"Meine Kontaktdaten",pt:"Meus contactos",it:"I miei contatti",br:"Ma titouroù darempred",sv:"Mina kontaktuppgifter",nl:"Mijn contactgegevens",pl:"Moje dane kontaktowe"},
  "Mon profil LinkedIn": {es:"Mi perfil de LinkedIn",de:"Mein LinkedIn-Profil",pt:"Meu perfil no LinkedIn",it:"Il mio profilo LinkedIn",br:"Ma profil LinkedIn",sv:"Min LinkedIn-profil",nl:"Mijn LinkedIn-profiel",pl:"Mój profil LinkedIn"},
  "M'écrire un message": {es:"Escríbeme un mensaje",de:"Schreib mir eine Nachricht",pt:"Escreva-me uma mensagem",it:"Scrivimi un messaggio",br:"Skrivit ur gemennadenn din",sv:"Skriv ett meddelande till mig",nl:"Stuur me een bericht",pl:"Napisz do mnie wiadomość"},
  "Nom": {es:"Nombre",de:"Name",pt:"Nome",it:"Nome",br:"Anv",sv:"Namn",nl:"Naam",pl:"Imię"},
  "Message": {es:"Mensaje",de:"Nachricht",pt:"Mensagem",it:"Messaggio",br:"Kemennadenn",sv:"Meddelande",nl:"Bericht",pl:"Wiadomość"},
  "Envoyer": {es:"Enviar",de:"Senden",pt:"Enviar",it:"Invia",br:"Kas",sv:"Skicka",nl:"Verzenden",pl:"Wyślij"},
  "Mentions légales": {es:"Aviso legal",de:"Impressum",pt:"Aviso legal",it:"Note legali",br:"Notennoù lezennel",sv:"Juridisk information",nl:"Juridische vermeldingen",pl:"Informacje prawne"},
  "Votre nom": {es:"Tu nombre",de:"Dein Name",pt:"O seu nome",it:"Il tuo nome",br:"Ho anv",sv:"Ditt namn",nl:"Uw naam",pl:"Twoje imię"},
  "Votre message…": {es:"Tu mensaje…",de:"Deine Nachricht…",pt:"A sua mensagem…",it:"Il tuo messaggio…",br:"Ho kemennadenn…",sv:"Ditt meddelande…",nl:"Uw bericht…",pl:"Twoja wiadomość…"},
  "Étudiant BTS SIO – SISR · 21 ans · Permis B, B1, AM": {es:"Estudiante de BTS SIO – SISR · 21 años · Carnets B, B1, AM",de:"BTS-SIO-SISR-Student · 21 Jahre · Führerscheine B, B1, AM",pt:"Estudante de BTS SIO – SISR · 21 anos · Cartas B, B1, AM",it:"Studente BTS SIO – SISR · 21 anni · Patenti B, B1, AM",br:"Studier BTS SIO – SISR · 21 vloaz · Aotreoù-tremen B, B1, AM",sv:"BTS SIO – SISR-student · 21 år · Körkort B, B1, AM",nl:"Student BTS SIO – SISR · 21 jaar · Rijbewijzen B, B1, AM",pl:"Student BTS SIO – SISR · 21 lat · Prawa jazdy B, B1, AM"},
  "Télécharger mon CV (PDF)": {es:"Descargar mi CV (PDF)",de:"Meinen Lebenslauf herunterladen (PDF)",pt:"Descarregar o meu CV (PDF)",it:"Scarica il mio CV (PDF)",br:"Pellgargañ ma CV (PDF)",sv:"Ladda ner mitt CV (PDF)",nl:"Download mijn cv (PDF)",pl:"Pobierz moje CV (PDF)"},
  "Sérieux et impliqué dans mon travail, sociable. Je mets en œuvre des solutions d'administration systèmes et réseaux dans des environnements professionnels réels.": {es:"Serio y comprometido con mi trabajo, sociable. Implemento soluciones de administración de sistemas y redes en entornos profesionales reales.",de:"Gewissenhaft und engagiert bei der Arbeit, kontaktfreudig. Ich setze System- und Netzwerkverwaltungslösungen in echten beruflichen Umgebungen um.",pt:"Sério e empenhado no meu trabalho, sociável. Implemento soluções de administração de sistemas e redes em ambientes profissionais reais.",it:"Serio e impegnato nel mio lavoro, socievole. Realizzo soluzioni di amministrazione di sistemi e reti in ambienti professionali reali.",br:"Serius ha prederiet gant ma labour, kevredigel. Ober a ran gant diskoulmoù merañ reizhiadoù ha rouedadoù en endroioù micherel gwirion.",sv:"Seriös och engagerad i mitt arbete, social. Jag implementerar system- och nätverksadministrationslösningar i verkliga yrkesmiljöer.",nl:"Serieus en betrokken bij mijn werk, sociaal. Ik implementeer systeem- en netwerkbeheeroplossingen in echte professionele omgevingen.",pl:"Poważny i zaangażowany w pracę, towarzyski. Wdrażam rozwiązania z zakresu administracji systemami i sieciami w rzeczywistych środowiskach zawodowych."},
  "Études & Diplômes": {es:"Estudios y Diplomas",de:"Ausbildung & Abschlüsse",pt:"Estudos e Diplomas",it:"Studi e Diplomi",br:"Studioù & Diplomoù",sv:"Studier & Examina",nl:"Studies & Diploma's",pl:"Nauka i Dyplomy"},
  "2024 – 2026 · Obtenu en 2026": {es:"2024 – 2026 · Obtenido en 2026",de:"2024 – 2026 · Abschluss 2026",pt:"2024 – 2026 · Obtido em 2026",it:"2024 – 2026 · Conseguito nel 2026",br:"2024 – 2026 · Bet en 2026",sv:"2024 – 2026 · Erhållen 2026",nl:"2024 – 2026 · Behaald in 2026",pl:"2024 – 2026 · Uzyskane w 2026"},
  "Bac Professionnel MELEC": {es:"Bachillerato Profesional MELEC",de:"Berufsabitur MELEC",pt:"Bacharelato Profissional MELEC",it:"Diploma Professionale MELEC",br:"Bac Profesionel MELEC",sv:"Yrkesgymnasium MELEC",nl:"Beroepsdiploma MELEC",pl:"Bac Zawodowy MELEC"},
  "2021 – 2024 · Obtenu en 2024": {es:"2021 – 2024 · Obtenido en 2024",de:"2021 – 2024 · Abschluss 2024",pt:"2021 – 2024 · Obtido em 2024",it:"2021 – 2024 · Conseguito nel 2024",br:"2021 – 2024 · Bet en 2024",sv:"2021 – 2024 · Erhållen 2024",nl:"2021 – 2024 · Behaald in 2024",pl:"2021 – 2024 · Uzyskane w 2024"},
  "Expériences": {es:"Experiencias",de:"Erfahrungen",pt:"Experiências",it:"Esperienze",br:"Skiantourioù",sv:"Erfarenheter",nl:"Ervaringen",pl:"Doświadczenie"},
  "Changement de matériel, déploiement de systèmes. Mise en place serveur PRTG, serveur physique et WSUS.": {es:"Cambio de equipos, despliegue de sistemas. Configuración de servidor PRTG, servidor físico y WSUS.",de:"Hardwarewechsel, Systembereitstellung. Einrichtung eines PRTG-Servers, physischen Servers und WSUS.",pt:"Substituição de equipamentos, implantação de sistemas. Configuração de servidor PRTG, servidor físico e WSUS.",it:"Sostituzione di hardware, distribuzione di sistemi. Configurazione di server PRTG, server fisico e WSUS.",br:"Cheñch poelladoù, displegañ reizhiadoù. Sevel servijer PRTG, servijer fizikel ha WSUS.",sv:"Byte av utrustning, systemdistribution. Konfiguration av PRTG-server, fysisk server och WSUS.",nl:"Vervanging van apparatuur, uitrol van systemen. Opzetten van PRTG-server, fysieke server en WSUS.",pl:"Wymiana sprzętu, wdrażanie systemów. Konfiguracja serwera PRTG, serwera fizycznego i WSUS."},
  "Agent d'entretien": {es:"Agente de mantenimiento",de:"Reinigungskraft",pt:"Agente de limpeza",it:"Addetto alle pulizie",br:"Ostiz diazez",sv:"Städare",nl:"Onderhoudsmedewerker",pl:"Pracownik gospodarczy"},
  "Juin – Août 2023": {es:"Junio – Agosto 2023",de:"Juni – August 2023",pt:"Junho – Agosto 2023",it:"Giugno – Agosto 2023",br:"Even – Eost 2023",sv:"Juni – Augusti 2023",nl:"Juni – Augustus 2023",pl:"Czerwiec – Sierpień 2023"},
  "Nettoyage, rangement, remise/reprise de matériel.": {es:"Limpieza, orden, entrega/recogida de material.",de:"Reinigung, Aufräumen, Materialübergabe/-rücknahme.",pt:"Limpeza, arrumação, entrega/devolução de material.",it:"Pulizia, riordino, consegna/ritiro del materiale.",br:"Naetaat, renkañ, kinnig/adkemer poelladoù.",sv:"Städning, ordning, utlämning/återlämning av material.",nl:"Schoonmaken, opruimen, overdracht/inname van materiaal.",pl:"Sprzątanie, porządkowanie, wydawanie/odbiór sprzętu."},
  "Câblage de maisons, appartements, magasins, usines.": {es:"Cableado de casas, apartamentos, tiendas, fábricas.",de:"Verkabelung von Häusern, Wohnungen, Geschäften, Fabriken.",pt:"Cablagem de casas, apartamentos, lojas, fábricas.",it:"Cablaggio di case, appartamenti, negozi, fabbriche.",br:"Kabliñ tiez, apartamantoù, stalioù, melioù.",sv:"Kabeldragning i hus, lägenheter, butiker, fabriker.",nl:"Bekabeling van huizen, appartementen, winkels, fabrieken.",pl:"Okablowanie domów, mieszkań, sklepów, fabryk."},
  "Centres d'intérêt": {es:"Intereses",de:"Interessen",pt:"Interesses",it:"Interessi",br:"Dedennoù",sv:"Intressen",nl:"Interesses",pl:"Zainteresowania"},
  "Électricité tertiaire": {es:"Electricidad terciaria",de:"Tertiärelektrik",pt:"Eletricidade terciária",it:"Elettricità terziaria",br:"Tredan tredydelezh",sv:"El för kontorsfastigheter",nl:"Tertiaire elektriciteit",pl:"Elektryka usługowa"},
  "Domotique": {es:"Domótica",de:"Hausautomation",pt:"Domótica",it:"Domotica",br:"Kartouarezh ti",sv:"Hemautomation",nl:"Domotica",pl:"Automatyka domowa"},
  "Éditeur": {es:"Editor",de:"Herausgeber",pt:"Editor",it:"Editore",br:"Embanner",sv:"Utgivare",nl:"Uitgever",pl:"Wydawca"},
  "Hébergement": {es:"Alojamiento",de:"Hosting",pt:"Alojamento",it:"Hosting",br:"Herberc'hiañ",sv:"Webbhotell",nl:"Hosting",pl:"Hosting"},
  "GitHub Pages — GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis.": {es:"GitHub Pages — GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, Estados Unidos.",de:"GitHub Pages — GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA.",pt:"GitHub Pages — GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, Estados Unidos.",it:"GitHub Pages — GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, Stati Uniti.",br:"GitHub Pages — GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, Stadoù-Unanet.",sv:"GitHub Pages — GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA.",nl:"GitHub Pages — GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, Verenigde Staten.",pl:"GitHub Pages — GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, Stany Zjednoczone."},
  "Droits d'auteur": {es:"Derechos de autor",de:"Urheberrecht",pt:"Direitos de autor",it:"Diritti d'autore",br:"Gwirioù aozer",sv:"Upphovsrätt",nl:"Auteursrecht",pl:"Prawa autorskie"},
  "© 2026 Ioen Le Gourlay-Denis — Tous droits réservés. Toute reproduction interdite sans autorisation écrite préalable.": {es:"© 2026 Ioen Le Gourlay-Denis — Todos los derechos reservados. Prohibida toda reproducción sin autorización escrita previa.",de:"© 2026 Ioen Le Gourlay-Denis — Alle Rechte vorbehalten. Jegliche Vervielfältigung ohne vorherige schriftliche Genehmigung ist untersagt.",pt:"© 2026 Ioen Le Gourlay-Denis — Todos os direitos reservados. Proibida qualquer reprodução sem autorização escrita prévia.",it:"© 2026 Ioen Le Gourlay-Denis — Tutti i diritti riservati. È vietata qualsiasi riproduzione senza previa autorizzazione scritta.",br:"© 2026 Ioen Le Gourlay-Denis — Pep gwir miret strizh. Difennet eo adkempouezañ hep aotre skrivet a-raok.",sv:"© 2026 Ioen Le Gourlay-Denis — Alla rättigheter förbehållna. All kopiering utan föregående skriftligt tillstånd är förbjuden.",nl:"© 2026 Ioen Le Gourlay-Denis — Alle rechten voorbehouden. Elke reproductie zonder voorafgaande schriftelijke toestemming is verboden.",pl:"© 2026 Ioen Le Gourlay-Denis — Wszelkie prawa zastrzeżone. Wszelkie powielanie bez uprzedniej pisemnej zgody jest zabronione."},
  "Données personnelles": {es:"Datos personales",de:"Personenbezogene Daten",pt:"Dados pessoais",it:"Dati personali",br:"Roadennoù personel",sv:"Personuppgifter",nl:"Persoonsgegevens",pl:"Dane osobowe"},
  "Ce site ne collecte aucune donnée personnelle. Pas de formulaire actif côté serveur, pas de cookies traçants, pas d'analytique.": {es:"Este sitio no recopila ningún dato personal. Sin formulario activo del lado del servidor, sin cookies de seguimiento, sin analítica.",de:"Diese Website erhebt keine personenbezogenen Daten. Kein serverseitiges aktives Formular, keine Tracking-Cookies, keine Analyse.",pt:"Este site não recolhe qualquer dado pessoal. Sem formulário ativo do lado do servidor, sem cookies de rastreamento, sem análise.",it:"Questo sito non raccoglie alcun dato personale. Nessun modulo attivo lato server, nessun cookie di tracciamento, nessuna analisi.",br:"Ar lec'hienn-mañ ne zastum roadenn bersonel ebet. Formulenn oberiant war gostez ar servijer ebet, toupinoù heuliañ ebet, dielfennadur ebet.",sv:"Denna webbplats samlar inte in några personuppgifter. Inget aktivt serverformulär, inga spårningscookies, ingen analys.",nl:"Deze site verzamelt geen persoonsgegevens. Geen actief serverformulier, geen trackingcookies, geen analytics.",pl:"Ta strona nie zbiera żadnych danych osobowych. Brak aktywnego formularza po stronie serwera, brak plików cookie śledzących, brak analityki."},
  "← Accueil": {es:"← Inicio",de:"← Startseite",pt:"← Início",it:"← Home",br:"← Degemer",sv:"← Hem",nl:"← Home",pl:"← Strona główna"},
  "← Projets": {es:"← Proyectos",de:"← Projekte",pt:"← Projetos",it:"← Progetti",br:"← Raktresoù",sv:"← Projekt",nl:"← Projecten",pl:"← Projekty"},
  "IT · Réseaux · Cybersécurité": {es:"IT · Redes · Ciberseguridad",de:"IT · Netzwerke · Cybersicherheit",pt:"TI · Redes · Cibersegurança",it:"IT · Reti · Cybersicurezza",br:"IT · Rouedadoù · Cyberdiogelroez",sv:"IT · Nätverk · Cybersäkerhet",nl:"IT · Netwerken · Cybersecurity",pl:"IT · Sieci · Cyberbezpieczeństwo"},
  "Suivi des évolutions dans le domaine des systèmes, réseaux et cybersécurité.": {es:"Seguimiento de las novedades en sistemas, redes y ciberseguridad.",de:"Verfolgung der Entwicklungen in den Bereichen Systeme, Netzwerke und Cybersicherheit.",pt:"Acompanhamento das evoluções em sistemas, redes e cibersegurança.",it:"Monitoraggio degli sviluppi in ambito sistemi, reti e cybersicurezza.",br:"Heuliañ an emdroadurioù e maez ar reizhiadoù, ar rouedadoù hag ar cyberdiogelroez.",sv:"Uppföljning av utvecklingen inom system, nätverk och cybersäkerhet.",nl:"Opvolging van ontwikkelingen op het gebied van systemen, netwerken en cyberbeveiliging.",pl:"Śledzenie zmian w dziedzinie systemów, sieci i cyberbezpieczeństwa."},
  "Ma veille technologique complète est disponible en ligne sur un site dédié.": {es:"Mi vigilancia tecnológica completa está disponible en línea en un sitio dedicado.",de:"Meine vollständige Technologiebeobachtung ist online auf einer eigenen Website verfügbar.",pt:"A minha vigilância tecnológica completa está disponível online num site dedicado.",it:"Il mio osservatorio tecnologico completo è disponibile online su un sito dedicato.",br:"Ma gward teknologel klok a zo hegerz enlinenn war ul lec'hienn dedennet.",sv:"Min fullständiga teknikbevakning finns tillgänglig online på en dedikerad webbplats.",nl:"Mijn volledige technologische watch is online beschikbaar op een speciale site.",pl:"Moja pełna obserwacja technologiczna jest dostępna online na dedykowanej stronie."},
  "Voir la veille technologique ↗": {es:"Ver la vigilancia tecnológica ↗",de:"Technologiebeobachtung ansehen ↗",pt:"Ver a vigilância tecnológica ↗",it:"Vedi l'osservatorio tecnologico ↗",br:"Gwelet ar gward teknologel ↗",sv:"Se teknikbevakningen ↗",nl:"Bekijk de technologische watch ↗",pl:"Zobacz obserwację technologiczną ↗"},
  "Accueil": {es:"Inicio",de:"Startseite",pt:"Início",it:"Home",br:"Degemer",sv:"Hem",nl:"Home",pl:"Strona główna"},
  "Supervision Réseau": {es:"Supervisión de Red",de:"Netzwerküberwachung",pt:"Supervisão de Rede",it:"Supervisione di Rete",br:"Gward Rouedad",sv:"Nätverksövervakning",nl:"Netwerkbewaking",pl:"Nadzór Sieci"},
  "Qu'est-ce que PRTG ?": {es:"¿Qué es PRTG?",de:"Was ist PRTG?",pt:"O que é o PRTG?",it:"Cos'è PRTG?",br:"Petra eo PRTG?",sv:"Vad är PRTG?",nl:"Wat is PRTG?",pl:"Czym jest PRTG?"},
  "Fonctionnement de base": {es:"Funcionamiento básico",de:"Grundfunktion",pt:"Funcionamento básico",it:"Funzionamento di base",br:"Doare labour diazez",sv:"Grundläggande funktion",nl:"Basiswerking",pl:"Podstawowe działanie"},
  "Groupe": {es:"Grupo",de:"Gruppe",pt:"Grupo",it:"Gruppo",br:"Strollad",sv:"Grupp",nl:"Groep",pl:"Grupa"},
  "Appareil (Device)": {es:"Dispositivo",de:"Gerät",pt:"Dispositivo",it:"Dispositivo",br:"Trevnad",sv:"Enhet",nl:"Apparaat",pl:"Urządzenie"},
  "Capteur (Sensor)": {es:"Sensor",de:"Sensor",pt:"Sensor",it:"Sensore",br:"Kizidik",sv:"Sensor",nl:"Sensor",pl:"Czujnik"},
  "Installation (Windows)": {es:"Instalación (Windows)",de:"Installation (Windows)",pt:"Instalação (Windows)",it:"Installazione (Windows)",br:"Staliadur (Windows)",sv:"Installation (Windows)",nl:"Installatie (Windows)",pl:"Instalacja (Windows)"},
  "Découverte automatique": {es:"Descubrimiento automático",de:"Automatische Erkennung",pt:"Descoberta automática",it:"Rilevamento automatico",br:"Dizoloadenn emgefre",sv:"Automatisk identifiering",nl:"Automatische detectie",pl:"Automatyczne wykrywanie"},
  "Capteurs essentiels": {es:"Sensores esenciales",de:"Wesentliche Sensoren",pt:"Sensores essenciais",it:"Sensori essenziali",br:"Kizidikerien pouezus",sv:"Viktiga sensorer",nl:"Essentiële sensoren",pl:"Kluczowe czujniki"},
  "Capteur Ping": {es:"Sensor Ping",de:"Ping-Sensor",pt:"Sensor Ping",it:"Sensore Ping",br:"Kizidik Ping",sv:"Ping-sensor",nl:"Ping-sensor",pl:"Czujnik Ping"},
  "Trafic ports fibres (switch)": {es:"Tráfico de puertos de fibra (switch)",de:"Glasfaser-Port-Traffic (Switch)",pt:"Tráfego de portas de fibra (switch)",it:"Traffico porte in fibra (switch)",br:"Trafik porzhioù fiber (switch)",sv:"Trafik på fiberportar (switch)",nl:"Verkeer op glasvezelpoorten (switch)",pl:"Ruch na portach światłowodowych (switch)"},
  "Alertes par email": {es:"Alertas por correo",de:"E-Mail-Benachrichtigungen",pt:"Alertas por email",it:"Avvisi via email",br:"Alarmoù dre bostel",sv:"E-postaviseringar",nl:"E-mailmeldingen",pl:"Alerty e-mail"},
  "Bonnes pratiques": {es:"Buenas prácticas",de:"Best Practices",pt:"Boas práticas",it:"Buone pratiche",br:"Poelladurioù mat",sv:"Bästa praxis",nl:"Beste praktijken",pl:"Dobre praktyki"}
};

const EXTRA_LANGS = ['es','de','pt','it','br','sv','nl','pl'];
const ALL_LANGS = ['fr','en',...EXTRA_LANGS];

function translate(frText, enText, l) {
  if (l === 'fr') return frText;
  if (l === 'en') return enText != null ? enText : frText;
  const dict = TRANSLATIONS[frText];
  if (dict && dict[l]) return dict[l];
  return enText != null ? enText : frText;
}

function applyLang(l) {
  if (!ALL_LANGS.includes(l)) l = 'fr';
  lang = l;
  localStorage.setItem('lgd-lang', l);

  const select = document.getElementById('langSelect');
  if (select) select.value = l;

  document.querySelectorAll('[data-fr]').forEach(el => {
    el.textContent = translate(el.dataset.fr, el.dataset.en, l);
  });
  document.querySelectorAll('[data-ph-fr]').forEach(el => {
    el.placeholder = translate(el.dataset.phFr, el.dataset.phEn, l);
  });

  document.documentElement.lang = l;
}

const langSelect = document.getElementById('langSelect');
if (langSelect) langSelect.addEventListener('change', () => applyLang(langSelect.value));
applyLang(lang);

/* ── Nav scroll ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (!nav) return;
  nav.querySelector('.nav-pill').style.background =
    window.scrollY > 30 ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.58)';
}, { passive: true });

/* ── Burger ── */
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');
if (burger && drawer) {
  burger.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    burger.classList.toggle('open', open);
  });
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      drawer.classList.remove('open');
      burger.classList.remove('open');
    });
  });
}

/* ── iOS-style scroll animation ── */
const ioEls = document.querySelectorAll('.ios-anim');
if (ioEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delay = parseInt(entry.target.dataset.d || '0', 10);
      setTimeout(() => entry.target.classList.add('in'), delay);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });
  ioEls.forEach(el => observer.observe(el));
}

/* ── Skill bars ── */
const skillCards = document.querySelectorAll('.skill-card');
if (skillCards.length) {
  const skillObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.bar-fill').forEach((bar, i) => {
        setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, i * 100);
      });
      skillObs.unobserve(entry.target);
    });
  }, { threshold: 0.3 });
  skillCards.forEach(c => skillObs.observe(c));
}

/* ── Active nav link ── */
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-a');
if (sections.length && navAs.length) {
  const secObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => secObs.observe(s));
}

/* ── Contact form ── */
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
if (form && status) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name  = document.getElementById('fname').value.trim();
    const email = document.getElementById('femail').value.trim();
    const msg   = document.getElementById('fmsg').value.trim();
    if (!name || !email || !msg) return;
    const sub  = encodeURIComponent('Contact Portfolio – ' + name);
    const body = encodeURIComponent('De : ' + name + ' <' + email + '>\n\n' + msg);
    window.location.href = 'mailto:legourlayioen.pro@outlook.com?subject=' + sub + '&body=' + body;
    status.textContent = lang === 'fr' ? '✓ Votre client mail va s\'ouvrir…' : '✓ Your mail client will open…';
    form.reset();
    setTimeout(() => { status.textContent = ''; }, 5000);
  });
}