import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CreateTask from "../pages/CreateTask";
import { MemoryRouter } from "react-router-dom";

// Mock de l'API
const mockPost = vi.fn();
vi.mock('../services/api', () => ({
    default: {
    post: (...args) => mockPost(...args),
}    
}));

// Mock de useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

// Mock de react-hot-toast
vi.mock("react-hot-toast", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

// Test de soumission du formulaire
describe("CreateTask", () => { 
    it("soumet le formulaire avec les données correctes", async () => {
        // Simuler la soumission du formulaire
        render(<CreateTask />, { wrapper: MemoryRouter });

        // Remplir le formulaire
        fireEvent.change(screen.getByTestId("title"), 
        { target: { value: "Nouvelle tâche" } }); 
        
        fireEvent.change(screen.getByTestId("description"), 
        { target: { value: "Description de la tâche" } });

        // Soumettre le formulaire
        fireEvent.click(screen.getByTestId("submit"));

        // Vérifier que la fonction post a été appelée avec les bonnes données
        await waitFor(() => {
            expect(mockPost).toHaveBeenCalledWith('/tasks', {
            title: "Nouvelle tâche",
            description: "Description de la tâche",
            status: "todo",
        });
        });
        await new Promise((r) => {
            setTimeout(r, 900);            
        })
        
        // Vérifier que la navigation vers la page "/tasks" a eu lieu
        expect(mockNavigate).toHaveBeenCalledWith("/tasks");
    });
});