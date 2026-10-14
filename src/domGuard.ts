/**
 * Traductores del navegador y algunas extensiones (Google Translate, Grammarly,
 * Dark Reader, etc.) modifican el HTML por debajo de React. Cuando React luego
 * intenta quitar o insertar un nodo que ya no está donde lo dejó, el navegador
 * lanza "NotFoundError" y la app entera se cae. Este parche hace que esas
 * operaciones fallen en silencio en lugar de romper la página.
 * (Solución conocida: https://github.com/facebook/react/issues/11538)
 */
export function installDomGuard() {
  if (typeof Node !== "function" || !Node.prototype) return;

  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) {
      if (child.parentNode) child.parentNode.removeChild(child);
      return child;
    }
    return originalRemoveChild.call(this, child) as T;
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(this: Node, newNode: T, refNode: Node | null): T {
    if (refNode && refNode.parentNode !== this) {
      return originalInsertBefore.call(this, newNode, null) as T;
    }
    return originalInsertBefore.call(this, newNode, refNode) as T;
  };
}
