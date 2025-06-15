function unlockAchievements(achievementNumber) {
    if (achievementNumber < achievements.length && achievements[achievementNumber] === false) {
        achievements[achievementNumber] = true;

        let done = true;
        for (let i = 0; i < achievements.length - 1; i++) {
            if (!achievements[i]) {
                done = false;
            }
        }
        if (done) {
            achievements[achievements.length - 1] = true;
        }
        updateAchievementUI();
    }
}

function updateAchievementUI(){
    for (let i=0; i < achievements.length; i++){
        if (achievements[i]){
            let completedAchievement = document.querySelector(`#achievementGallery .achievement:nth-child(${i+1})`)
            completedAchievement.style.opacity = "1";
            completedAchievement.style.background = "#ffffff";
        }
    }
}