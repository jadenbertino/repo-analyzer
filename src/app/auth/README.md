# Authentication Frontend Components

Complete authentication frontend built with shadcn/ui components, configured for dark mode by default.

## Components

### 🔐 Sign Up (`/auth/signup`)
- **Email field** with email validation
- **Password field** with validation (minimum 8 characters)
- Link to sign in page
- Dark mode styled card layout

### 🔑 Sign In (`/auth/signin`)
- **Email field** with email validation  
- **Password field** with required validation
- **Forgot password link** (links to forgot password page)
- Link to sign up page
- Dark mode styled card layout

### 🔓 Forgot Password (`/auth/forgot-password`)
- **Email field** with email validation
- **Two-state UI**:
  1. **Input form** - Enter email to request reset
  2. **Success confirmation** - Shows after form submission
- **Interactive features**:
  - Send another email button
  - Links back to sign in and sign up
- Dark mode styled card layout

## Features

✨ **Dark mode by default** - Beautiful dark theme across all pages  
✨ **Simplified forms** - Only email + password fields (no name, no confirm password)  
✨ **Form validation** - Real-time validation with error messages  
✨ **Responsive design** - Mobile-friendly layouts  
✨ **shadcn/ui components** - Accessible, modern UI components  
✨ **TypeScript** - Fully typed with zod validation schemas  
✨ **State management** - React Hook Form for form handling  
✨ **Interactive UX** - Success states and navigation between pages  

## Routes

- `/auth/signup` - Create new account
- `/auth/signin` - Sign into existing account  
- `/auth/forgot-password` - Reset password flow

## Dependencies

**shadcn/ui components:**
- `Button` - Form submission and navigation
- `Card` (with Header, Content, Footer, Title, Description)
- `Form` (with Field, Item, Label, Control, Message)
- `Input` - Text and password inputs

**Form handling:**
- `react-hook-form` - Form state management
- `zod` - Validation schemas
- `@hookform/resolvers` - Zod integration

## Implementation Notes

- **Frontend-only** - No backend integration, forms log to console
- **Dark theme** - Configured via `dark` class on html element
- **Validation** - Email format validation, password length requirements
- **Navigation** - Cross-linking between all auth pages
- **Success states** - Forgot password shows confirmation UI
- **Accessibility** - Built with Radix UI primitives via shadcn/ui

## Development

Access the auth pages at:
- `http://localhost:3001/auth/signup`
- `http://localhost:3001/auth/signin`
- `http://localhost:3001/auth/forgot-password`

All forms currently log submitted data to the browser console and show alerts.