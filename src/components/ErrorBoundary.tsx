import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Card } from "./Card";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-black flex items-center justify-center p-6 text-white font-mono">
                    <Card className="w-full max-w-lg p-8 border-red-500/30 bg-red-900/10">
                        <h1 className="text-2xl font-bold text-red-500 mb-4">[ SYSTEM CRITICAL FAILURE ]</h1>
                        <p className="text-gray-400 mb-6">
                            A runtime exception has compromised the agent interface.
                        </p>
                        <div className="p-4 bg-black/50 border border-red-500/10 rounded mb-6 overflow-auto max-h-48 text-xs text-red-400">
                            {this.state.error?.toString()}
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-red-500 text-white rounded font-bold hover:bg-red-600 transition-colors uppercase tracking-wider text-sm"
                        >
                            [ REBOOT SYSTEM ]
                        </button>
                    </Card>
                </div>
            );
        }

        return this.props.children;
    }
}
