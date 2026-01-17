import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '../app/page'

// Mock the components that might cause issues in test environment or require data
vi.mock('@/components/layout/LanguageContext', () => ({
    useLanguage: () => ({ language: 'en', setLanguage: vi.fn() }),
    LanguageProvider: ({ children }: any) => <div>{children}</div>
}))

vi.mock('@/components/ui/ConstellationCanvas', () => ({
    ConstellationCanvas: () => <div data-testid="constellation-canvas" />
}))

// Mock sections to simplify integration test
vi.mock('@/components/sections/Hero', () => ({ Hero: () => <div data-testid="hero-section">Hero</div> }))
vi.mock('@/components/sections/Projects', () => ({ Projects: () => <div data-testid="projects-section">Projects</div> }))
vi.mock('@/components/sections/TravelMap', () => ({ TravelMap: () => <div data-testid="travel-section">Travel</div> }))
vi.mock('@/components/sections/Lifestyle', () => ({ Lifestyle: () => <div data-testid="lifestyle-section">Lifestyle</div> }))
vi.mock('@/components/sections/Wishlist', () => ({ Wishlist: () => <div data-testid="wishlist-section">Wishlist</div> }))
vi.mock('@/components/sections/Contact', () => ({ Contact: () => <div data-testid="contact-section">Contact</div> }))

describe('Home Page Smoke Test', () => {
    it('renders all main sections without crashing', async () => {
        render(<Home />)

        expect(screen.getByTestId('hero-section')).toBeDefined()
        expect(screen.getByTestId('projects-section')).toBeDefined()
        expect(screen.getByTestId('travel-section')).toBeDefined()
        expect(screen.getByTestId('lifestyle-section')).toBeDefined()
        expect(screen.getByTestId('wishlist-section')).toBeDefined()
        expect(screen.getByTestId('contact-section')).toBeDefined()
    })
})
