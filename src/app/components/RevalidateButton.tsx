'use client';

export default function RevalidateButton() {
  return (
    <button
      onClick={async () => {
        await fetch('/api/revalidate', { method: 'POST' });
        window.location.reload();
      }}
      className="uppercase"
    >
      Revalidate
    </button>
  );
}
