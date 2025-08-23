// Konami code sequence: ↑↑↓↓←→←→BA
const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

export function registerKonamiCode(callback: () => void): () => void {
  let sequenceIndex = 0;
  
  const handleKeyDown = (event: KeyboardEvent) => {
    const expectedKey = KONAMI_SEQUENCE[sequenceIndex];
    
    if (event.code === expectedKey) {
      sequenceIndex++;
      
      if (sequenceIndex === KONAMI_SEQUENCE.length) {
        // Konami code completed!
        callback();
        sequenceIndex = 0; // Reset for next time
      }
    } else {
      // Wrong key, reset sequence
      sequenceIndex = 0;
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  
  // Return cleanup function
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}
