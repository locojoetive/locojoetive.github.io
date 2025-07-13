# ⏰ Zeitgeist - Zeit-Schätzspiel

Eine hochoptimierte, mobile Web-App für ein kompetitives Zeit-Schätzspiel. Perfekt für Einzel- und Mehrspieler auf kleinsten Geräten.

## 🎮 Spielprinzip

Das Spiel dreht sich darum, eine bestimmte Zeitspanne (standardmäßig 10 Sekunden) möglichst genau zu schätzen:

1. **Start**: Tippe auf deinen zugeteilten Bildschirmbereich
2. **Verstecken**: Die Zeit-Anzeige verschwindet sofort
3. **Schätzen**: Tippe erneut wenn du glaubst, die Zeit ist um
4. **Ergebnis**: Sieh deine Genauigkeit in Sekunden

## ✨ Features

### 🎯 Spielmodi
- **Einzelspieler**: Vollflächiges Spiel für eine Person
- **Duell**: Zwei Spieler, horizontal geteilter Bildschirm
- **Gruppe**: Drei Spieler, vertikal geteilter Bildschirm

### 📱 Mobile Optimierung
- **Responsive Design**: Funktioniert auf allen Bildschirmgrößen
- **Touch-optimiert**: Vollflächige Touch-Bereiche
- **Performance**: Optimiert für ältere Smartphones
- **PWA**: Installierbar als App auf dem Homescreen

### ♿ Barrierefreiheit
- **Kontrastreiche Farben**: Gut sichtbar für alle Nutzer
- **Keyboard-Support**: ESC-Taste für Navigation
- **Reduzierte Animationen**: Unterstützt `prefers-reduced-motion`
- **Dark Mode**: Automatische Anpassung an System-Einstellungen

### 🌐 URL-Parameter
Direkte Links zu Spielmodi möglich:
- `?players=1&duration=10` - Einzelspieler, 10 Sekunden
- `?players=2&duration=15` - Duell, 15 Sekunden
- `?players=3&duration=20` - Gruppe, 20 Sekunden

## 🚀 Installation & Start

### Lokale Entwicklung
```bash
# Repository klonen
git clone https://github.com/yourusername/Zeitgeist.git
cd Zeitgeist

# Einfacher HTTP-Server starten (Python 3)
python -m http.server 8000

# Oder mit Node.js
npx serve .

# Oder mit PHP
php -S localhost:8000
```

### Produktions-Deployment
Die App ist statisch und kann auf jedem Web-Server gehostet werden:

- **GitHub Pages**: Einfach in ein Repository pushen
- **Netlify**: Drag & Drop der Dateien
- **Vercel**: Automatisches Deployment
- **Apache/Nginx**: Standard Web-Server

## 📁 Projektstruktur

```
Zeitgeist/
├── index.html          # Haupt-HTML-Datei
├── styles.css          # Responsive CSS-Styles
├── app.js             # Spiellogik & Interaktionen
├── manifest.json      # PWA-Manifest
├── sw.js             # Service Worker für Offline-Support
├── icon.svg          # App-Icon (SVG)
└── README.md         # Diese Datei
```

## 🛠️ Technische Details

### Technologie-Stack
- **Frontend**: Vanilla JavaScript (keine Frameworks)
- **Styling**: CSS3 mit CSS Custom Properties
- **PWA**: Service Worker für Offline-Funktionalität
- **Performance**: Optimiert für 60fps auf allen Geräten

### Browser-Support
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+
- ✅ Mobile Browser (iOS Safari, Chrome Mobile)

### Performance-Optimierungen
- **Minimale Bundle-Größe**: < 50KB gzipped
- **Lazy Loading**: Keine unnötigen Ressourcen
- **Touch-Optimierung**: `touch-action: manipulation`
- **Hardware-Beschleunigung**: CSS Transforms
- **Memory Management**: Saubere Event-Listener

## 🎨 Design-System

### Farben
```css
--primary-color: #2563eb    /* Hauptfarbe */
--success-color: #059669    /* Perfekt */
--warning-color: #d97706    /* Okay */
--error-color: #dc2626      /* Schlecht */
```

### Typografie
- **Font**: System Fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto)
- **Responsive**: `clamp()` für skalierbare Schriftgrößen
- **Hierarchie**: Klare visuelle Struktur

## 🔧 Anpassungen

### Eigene Spielmodi hinzufügen
```javascript
// In app.js
const customMode = {
    mode: 'custom',
    players: 4,
    targetDuration: 30
};
```

### Styling anpassen
```css
/* In styles.css */
:root {
    --primary-color: #your-color;
    --background: #your-bg;
}
```

## 📊 Bewertungssystem

Die Ergebnisse werden nach Genauigkeit bewertet:
- **Perfekt** (< 0.5s): 🟢 Grün
- **Gut** (< 1.0s): 🔵 Blau  
- **Okay** (< 2.0s): 🟡 Gelb
- **Schlecht** (≥ 2.0s): 🔴 Rot

## 🤝 Beitragen

1. Fork das Repository
2. Erstelle einen Feature-Branch (`git checkout -b feature/AmazingFeature`)
3. Committe deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Push zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

## 📄 Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Siehe [LICENSE](LICENSE) für Details.

## 🙏 Danksagungen

- Inspiriert von klassischen Zeit-Schätzspielen
- PWA-Features basierend auf Web-Standards
- Barrierefreiheit nach WCAG-Richtlinien

---

**Entwickelt mit ❤️ für mobile Gaming-Erfahrungen** 