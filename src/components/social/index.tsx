interface SocialProps {
  url: string;
  children: React.ReactNode;
}

export function Social(props: SocialProps) {
  return (
    <a
      href={props.url}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-transform hover:scale-110"
    >
      {props.children}
    </a>
  );
}
// children ele vai ser o componente que vai ser renderizado dentro do link que e o filho
// o target="_blank" e o rel="noopener noreferrer" fazem com que o link seja aberto em uma nova aba, e o rel="noopener noreferrer" é uma medida de segurança para evitar que a nova aba tenha acesso à página original. O className é usado para adicionar uma transição de transformação quando o usuário passa o mouse sobre o link, fazendo com que ele aumente de tamanho (scale-110) para dar um efeito visual agradável.
