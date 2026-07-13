let alertAudio: HTMLAudioElement | null = null;

export const playAlertSound = async () => {
  try {
    if (!alertAudio) {
      alertAudio = new Audio('/sounds/alert.mp3');
      alertAudio.preload = 'auto';
      alertAudio.volume = 1;
    }

    alertAudio.pause();
    alertAudio.currentTime = 0;

    await alertAudio.play();
  } catch {
    // Browser may block autoplay until the user has interacted with the page.
    // Alert sounds are non-critical, so silently ignore playback failures.
  }
};