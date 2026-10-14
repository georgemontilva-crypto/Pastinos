import { Component, type ReactNode } from "react";

type Props = { children: ReactNode; resetKey: string };
type State = { failed: boolean };

const KEY = "pastinos:lastReload";

/**
 * Red de seguridad: si algo falla al renderizar, recarga la página de forma
 * transparente (el visitante solo ve la página cargando). Para evitar bucles,
 * no vuelve a recargar si ya lo hizo hace menos de 10 segundos.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error("[Pastinos] render error", error);
    let last = 0;
    try {
      last = Number(sessionStorage.getItem(KEY) || 0);
      sessionStorage.setItem(KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
    if (Date.now() - last > 10_000) location.reload();
  }

  componentDidUpdate(prev: Props) {
    if (prev.resetKey !== this.props.resetKey && this.state.failed) this.setState({ failed: false });
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
