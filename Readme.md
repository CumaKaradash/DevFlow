# DevFlow - Developer Productivity Dashboard

A comprehensive productivity dashboard designed specifically for developers to track their work, manage goals, and stay focused.

## Features

-  Pomodoro Timer- Stay focused with customizable work/break intervals
- GitHub Activity Widget - Track your GitHub contributions and activity
-  Daily Goals- Set and manage daily tasks across different categories
-  Code Snippets Manager- Save and organize your frequently used code snippets
-  Activity Analytics- Visualize your productivity patterns with interactive charts
-  Dark Mode- Beautiful dark theme with smooth transitions
-  Data Persistence- All your data is stored locally using Zustand
- Responsive Design- Works seamlessly on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 18.18.0 or higher
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/devflow.git
cd devflow
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Charts:** [Recharts](https://recharts.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Theme:** [next-themes](https://github.com/pacocoursey/next-themes)
- **Analytics:** [Vercel Analytics](https://vercel.com/analytics)

## Project Structure

```
devflow/
├── app/                      # Next.js app directory
│   ├── error.tsx            # Error boundary
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── activity/            # Activity tracking components
│   ├── github/              # GitHub integration components
│   ├── goals/               # Goals management components
│   ├── pomodoro/            # Pomodoro timer components
│   ├── snippets/            # Code snippets components
│   ├── ui/                  # Reusable UI components
│   ├── header.tsx           # App header
│   └── theme-provider.tsx   # Theme provider
├── lib/                     # Utility functions and stores
│   ├── stores/              # Zustand stores
│   └── utils.ts             # Utility functions
├── public/                  # Static assets
└── styles/                  # Additional styles
```

## Features in Detail

### Pomodoro Timer
- Customizable focus, short break, and long break durations
- Sound notifications (optional)
- Auto-start next session (optional)
- Session history tracking

### GitHub Activity Widget
- Connect your GitHub account
- View recent contributions
- Track commit activity
- Responsive grid layout

### Daily Goals
- Create goals in different categories (code, learn, exercise, other)
- Mark goals as complete
- Daily progress tracking
- Goal analytics

### Code Snippets Manager
- Save code snippets with syntax highlighting
- Organize with tags
- Search and filter functionality
- Copy to clipboard
- Multiple language support

### Activity Analytics
- Weekly activity visualization
- Pomodoro session tracking
- Goals completion rates
- Interactive charts

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Add any environment variables here
```

### Customization

You can customize the app theme by editing `app/globals.css`:

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  /* ... other variables */
}
```

## Building for Production

```bash
pnpm build
# or
npm run build
```

Then start the production server:

```bash
pnpm start
# or
npm start
```

## Deployment

The easiest way to deploy DevFlow is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/devflow)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Radix UI](https://www.radix-ui.com/) for accessible UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Vercel](https://vercel.com) for hosting and analytics

## Roadmap

- [ ] Add GitHub authentication
- [ ] Export/Import data functionality
- [ ] Multiple theme options
- [ ] Mobile app version
- [ ] Team collaboration features
- [ ] Integration with other tools (Jira, Trello, etc.)
