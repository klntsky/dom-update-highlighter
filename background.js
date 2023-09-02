(chrome || browser).action.onClicked.addListener((tab) => {
  if (!tab.url.includes('chrome://')) {
      (chrome || browser).scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content.js']
    });
  }
});
