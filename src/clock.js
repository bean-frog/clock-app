
        let playingAudio = null;
        function updateClock() {
            const now = new Date();
            let hours = now.getHours();
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            let timeFormat = '24hr';
            if (document.getElementById('toggleFormat').checked) {
                timeFormat = '12hr';
            }
            let displayHours = hours; 
            if (timeFormat === '12hr') {
                displayHours = (displayHours % 12) || 12;
            }
            let time = `${displayHours}:${minutes}`;
            if (document.getElementById('toggleSeconds').checked) {
                time += `:${seconds}`;
            }
            if (timeFormat === '12hr') {
                const ampm = hours >= 12 ? 'PM' : 'AM';
                time += ` ${ampm}`;
            }
            document.getElementById('clock').textContent = time;
        }
        function toggleTheme() {
            const body = document.body;
            if (document.getElementById('toggleTheme').checked) {
                body.classList.remove('dark');
                body.classList.add('light');
            } else {
                body.classList.remove('light');
                body.classList.add('dark');
            }
        }
        function playAlarmSound() {
            if (playingAudio) {
                playingAudio.pause(); 
            }
            const alarmSound = document.getElementById('alarmSound').files[0];
            if (alarmSound) {
                playingAudio = new Audio(URL.createObjectURL(alarmSound));
                playingAudio.play();
            }
        }
        function setAlarm() {
            const alarmTime = document.getElementById('alarmTime').value;
            if (!alarmTime) {
                alert('Please set the alarm time.');
                return;
            }
            const now = new Date();
            const alarmDateTime = new Date(now.toDateString() + ' ' + alarmTime);
            const timeUntilAlarm = alarmDateTime - now;
            if (timeUntilAlarm <= 0) {
                alert('Please select a future time for the alarm.');
                return;
            }
            setTimeout(() => {
                playAlarmSound(); 
            }, timeUntilAlarm);
        }
        function stopAlarm() {
            if (playingAudio) {
                playingAudio.pause();
                playingAudio = null; 
            }
        }
        updateClock();
        toggleTheme();
        document.getElementById('toggleSeconds').addEventListener('change', updateClock);
        document.getElementById('toggleFormat').addEventListener('change', updateClock);
        document.getElementById('toggleTheme').addEventListener('change', toggleTheme);
        document.getElementById('setAlarm').addEventListener('click', setAlarm);
        document.getElementById('stopAlarm').addEventListener('click', stopAlarm);
        setInterval(updateClock, 1000);