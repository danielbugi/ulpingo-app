/**
 * Sound effects for interactive feedback
 * Uses Web Audio API for better performance
 */

class SoundManager {
  private context: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      this.context = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      this.enabled = localStorage.getItem('soundEnabled') !== 'false';
    }
  }

  private playTone(
    frequency: number,
    duration: number,
    type: OscillatorType = 'sine'
  ) {
    if (!this.context || !this.enabled) return;

    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.context.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, this.context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      this.context.currentTime + duration
    );

    oscillator.start(this.context.currentTime);
    oscillator.stop(this.context.currentTime + duration);
  }

  /**
   * Play success sound (correct answer)
   */
  playSuccess() {
    this.playTone(800, 0.2, 'sine');
    setTimeout(() => this.playTone(1000, 0.15, 'sine'), 100);
  }

  /**
   * Play error sound (wrong answer)
   */
  playError() {
    this.playTone(300, 0.3, 'sawtooth');
  }

  /**
   * Play flip sound (card flip)
   */
  playFlip() {
    this.playTone(600, 0.1, 'sine');
  }

  /**
   * Play complete sound (quiz/session complete)
   */
  playComplete() {
    const notes = [523, 659, 784, 1047]; // C, E, G, C octave
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.15, 'sine'), i * 150);
    });
  }

  /**
   * Play click sound (button press)
   */
  playClick() {
    this.playTone(400, 0.05, 'square');
  }

  /**
   * Toggle sound on/off
   */
  toggleSound() {
    this.enabled = !this.enabled;
    localStorage.setItem('soundEnabled', String(this.enabled));
    return this.enabled;
  }

  /**
   * Check if sound is enabled
   */
  isEnabled() {
    return this.enabled;
  }
}

// Export singleton instance
export const soundManager = new SoundManager();

// Export convenience functions
export const playSuccess = () => soundManager.playSuccess();
export const playError = () => soundManager.playError();
export const playFlip = () => soundManager.playFlip();
export const playComplete = () => soundManager.playComplete();
export const playClick = () => soundManager.playClick();
export const toggleSound = () => soundManager.toggleSound();
export const isSoundEnabled = () => soundManager.isEnabled();
