type Props = { title: string; prompt: string; compact?: boolean };

export function ImageBrief({ title, prompt, compact = false }: Props) {
  return (
    <div className={`image-brief${compact ? " image-brief--compact" : ""}`}>
      <div className="image-brief__label"><span>IMAGE 02</span><strong>{title}</strong></div>
      <details>
        <summary>Промпт для ChatGPT Image 2 <span>+</span></summary>
        <p>{prompt}</p>
      </details>
    </div>
  );
}
