# Modern React Dashboard

A modern, type-safe dashboard application built with React, TypeScript, and shadcn/ui components. This project follows shadcn's component architecture and styling patterns for consistency and maintainability.

## Tech Stack

- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite
- **UI Framework:** 
  - shadcn/ui (primary component library)
  - Radix UI Primitives (underlying primitives)
- **Styling:** Tailwind CSS (following shadcn conventions)

## Project Structure

```
├── README.md
├── components.json
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   ├── logo-full.svg
│   ├── logo.svg
│   └── vite.svg
├── src
│   ├── App.tsx
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   ├── layout
│   │   │   ├── header.tsx
│   │   │   └── sidebar.tsx
│   │   └── ui
│   │       ├── accordion.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── alert.tsx
│   │       ├── aspect-ratio.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── breadcrumb.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── chart.tsx
│   │       ├── checkbox.tsx
│   │       ├── collapsible.tsx
│   │       ├── command.tsx
│   │       ├── context-menu.tsx
│   │       ├── dialog.tsx
│   │       ├── drawer.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── hover-card.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── menubar.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── pagination.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── radio-group.tsx
│   │       ├── resizable.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       ├── sonner.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toast.tsx
│   │       ├── toaster.tsx
│   │       ├── toggle-group.tsx
│   │       ├── toggle.tsx
│   │       └── tooltip.tsx
│   ├── hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── index.css
│   ├── lib
│   │   └── utils.ts
│   ├── main.tsx
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## shadcn/ui Component Usage

All components follow shadcn/ui patterns:

```typescript
// Example component using shadcn patterns
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface DashboardCardProps {
  className?: string
  title: string
  children: React.ReactNode
}

export function DashboardCard({
  className,
  title,
  children
}: DashboardCardProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
```

## Component Guidelines

### Adding New Components

1. Use shadcn/ui CLI to add base components:
```bash
npx shadcn@latest add button
```

2. Extend components following shadcn patterns:
```typescript
import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "@/components/ui/button"

interface CustomButtonProps extends ButtonProps {
  customProp?: string
}

export function CustomButton({ customProp, className, ...props }: CustomButtonProps) {
  return (
    <Button 
      className={cn("custom-styles", className)} 
      {...props} 
    />
  )
}
```

### Styling Conventions

- Use Tailwind CSS with shadcn's `cn` utility
- Follow shadcn's component architecture:
  1. Base component from shadcn/ui
  2. Variant handling through class-variance-authority
  3. Composition using Radix UI primitives
  4. Type-safety with TypeScript
```

## Component Registry

All shadcn components are maintained in the `components/ui` directory. When adding new components, ensure they're properly registered and follow shadcn's patterns.

## License

MIT License - see LICENSE.md

---

Built with ❤️ using shadcn/ui and modern web technologies
