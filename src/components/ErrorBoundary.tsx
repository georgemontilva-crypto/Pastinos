import { Component, type ReactNode } from "react";

type Props = { children: ReactNode; resetKey: string };
type State = { failed: boolean };

/**
 * Si algo falla al cambiar de página (por ejemplo el traductor del navegador
 * modificando el HTML), en vez de dejar la pantalla en blanco recarga esa
 * página una sola vez.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error("[Pastinos] render error", error);
    const key = "reloaded:" + location.pathname;
    try {
      if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, "1");
        location.reload();
      }
    } catch {
      location.reload();
    }
  }

  componentDidUpdate(prev: Props) {
    if (prev.resetKey !== this.props.resetKey && this.state.failed) this.setState({ failed: false });
  }

  render() {
    if (this.state.failed) {
      return (
        <section className="notfound">
          <h1>Pastinos</h1>
          <button type="button" className="btn btn--wine" onClick={() => location.reload()}>
            Reload / Recargar
          </button>
        </section>
      );
    }
    return this.props.children;
  }
}
