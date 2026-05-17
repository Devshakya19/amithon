# AMITHON — Official Logo & Asset Design Prompts
**Target AI Generator:** NanoBanana Pro (Compatible with Midjourney v6, DALL-E 3, and Stable Diffusion / Flux)

---

## 🌌 1. Design Philosophy & Brand Identity
AMITHON is the elite technical event portal for Amity University (ASET). The core visual identity of the platform is built around the **"Cyber-Executive Glassmorphism"** design system.

### Key Visual Tokens:
- **Primary Accent:** Electric Blue (`#2563EB` / `rgba(37,99,235,1)`)
- **Secondary/Tertiary Accents:** Deep Violet, Neon Purple, and subtle Cyan highlights.
- **Texture & Material:** 3D Frosted Glass (Glassmorphism), translucent acrylic panels, quantum mesh waves, and glowing digital circuits.
- **Background Vibe:** Pitch-dark, sleek, professional corporate tech environment with ambient glowing orbs and aurora streaks.

---

## 🏆 2. Primary Brand Logo Prompts

Use the following highly engineered prompts in NanoBanana Pro to generate the official AMITHON logo used across the authentication portal (`login/page.tsx`, `register/page.tsx`) and main navigation headers.

### Option A: The Cybernetic "A" Emblem (Recommended for Main Brand Logo)
```text
/imagine prompt: A futuristic and elite technology brand logo for "AMITHON", featuring an abstract cybernetic letter 'A' intertwined with glowing digital circuits and quantum mesh waves. Cyber-executive aesthetic, 3D glassmorphism texture, translucent frosted glass with glowing electric blue (#2563EB) and deep violet neon edge lighting. Placed against a pitch-dark sleek background, hyper-detailed, octane render, unreal engine 5, ray-traced reflections, minimalist premium corporate tech identity, 8k resolution --ar 1:1 --stylize 750 --v 6.0
```

### Option B: The Quantum Innovation Core (Abstract Tech Concept)
```text
/imagine prompt: A premium abstract tech logo for an elite university event portal named "AMITHON". A glowing translucent 3D quantum innovation core floating inside a pristine glassmorphism shield emblem. Composed of liquid metal, glowing electric blue wiring, and soft purple neon lighting. Pitch black studio background, hyper-realistic, cinematic lighting, corporate tech elegance, 8k resolution, vector style clean edges --ar 1:1 --stylize 800 --v 6.0
```

### Option C: Minimalist Flat Tech Icon (For Favicon & Mobile App Icon)
```text
/imagine prompt: A minimalist modern app icon logo for "AMITHON", featuring a bold futuristic letter 'A' styled as a sleek glowing blue ribbon on a dark rounded squircle background. Subtle glassmorphism overlay, clean vector graphics, dribbble top aesthetic, apple iOS app icon style, 8k, hyper-crisp edges --ar 1:1 --stylize 500 --v 6.0
```

---

## 🎨 3. Event & Marketing Asset Prompts

Wherever placeholder images or banners are used across the website (e.g., `Events.tsx`, `EventCard.tsx`, `Hero.tsx`), use these specialized prompts to generate custom high-fidelity assets.

### 🚀 1. Flagship Hackathon Banner (HackAmity)
```text
/imagine prompt: A dynamic and breathtaking promotional banner for an elite hackathon named "HackAmity". A sleek futuristic trophy surrounded by glowing holographic code snippets, floating UI/UX glassmorphism screens, and glowing abstract neon wiring. Rich mesh gradient background in deep electric blue and dark indigo, subtle aurora streaks, cyber-executive vibe, cinematic lighting, hyper-realistic 3D render, depth of field, 8k, perfect for tech website hero card --ar 16:9 --stylize 600
```

### 🧠 2. AI & Emerging Tech Workshop Series
```text
/imagine prompt: A premium abstract visual representation of Artificial Intelligence and Machine Learning workshop. A glowing translucent 3D artificial brain/neural network core floating above a sleek metallic pedestal, emitting soft purple and violet quantum light pulses. Glassmorphism floating data nodes, dark cybernetic background with subtle dot-grid matrix, ultra-high fidelity, clean corporate tech aesthetic, cinema 4d render --ar 16:9 --stylize 650
```

### 📐 3. DesignX UI/UX Meetup
```text
/imagine prompt: An ultra-stylish and vibrant visual for a UI/UX Design Meetup named "DesignX". Abstract 3D floating geometric shapes (spheres, cubes, toruses) made of frosted glassmorphism and liquid metal, reflecting vibrant rose, magenta, and pink gradient lights. Minimalist dark background with elegant typography layout space, hyper-premium studio lighting, behance 3d style, dribbble elite aesthetic, 8k resolution --ar 16:9 --stylize 700
```

### 🌌 4. Hero Section Ambient Background Visual
```text
/imagine prompt: Abstract futuristic cyber-executive background visual for a university technology portal. Dark immersive ambient space featuring soft glowing mesh gradients in royal blue, cyan, and deep purple. Floating translucent glassmorphism panels, subtle digital scanlines, futuristic radar grid lines, and glowing bokeh orbs. Clean, minimalist, premium corporate tech atmosphere, 8k wallpaper, unreal engine 5 architectural render --ar 21:9 --stylize 500
```

---

## ⚙️ 4. NanoBanana Pro Configuration & Pro-Tips

To ensure the highest quality results, configure NanoBanana Pro with the following parameters:

1. **Aspect Ratios (`--ar`):**
   - **Logos / Avatars / Favicons:** `--ar 1:1` (Square)
   - **Event Cards / Banners:** `--ar 16:9` or `--ar 3:2` (Widescreen)
   - **Hero Backgrounds:** `--ar 21:9` (Ultra-wide)

2. **Stylize Parameter (`--stylize` or `--s`):**
   - Keep between `500` and `850` for rich, artistic, and hyper-detailed 3D glassmorphism textures without losing the core shape.

3. **Negative Prompt (Crucial for Clean UI Assets):**
   - Add the following exclusions to prevent unwanted artifacts:
     ```text
     --no text, words, letters, watermarks, signatures, distorted shapes, blurry, low quality, cartoon, anime, realistic human faces, white background
     ```

4. **Post-Processing & Implementation:**
   - Once the logo is generated, use an AI background remover (or tools like PhotoPhea/Photoshop) to export a transparent `.png` or `.webp`.
   - Replace the existing `src` URL in `src/app/(auth)/login/page.tsx` (Line 78) and `register/page.tsx` (Line 84) with your newly generated asset path (e.g., `/images/amithon-logo.png`).
