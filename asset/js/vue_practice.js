import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js'
var all_bg = ['maple_login', 'maple_arrow', 'maple_sky', 'maple_toy', 'maple_victoria'];
var bg_audio = new Audio('asset/sound/maple_login.mp3');
var click_music = new Audio('asset/sound/click01.mp3');
var vm = new Vue({
    el: '#root',
    data: {
        show: true,
        title: '簡單的圈圈叉叉小遊戲',
        player_1: 'o',
        player_2: 'x',
        turn: '',
        wintext: "",
        cols: [
            {
                position: '1',
                status: 0,
            },
            {
                position: "2",
                status: 0,
            },
            {
                position: "3",
                status: 0,
            },
            {
                position: "4",
                status: 0,
            },
            {
                position: "5",
                status: 0,
            },
            {
                position: "6",
                status: 0,
            },
            {
                position: "7",
                status: 0,
            },
            {
                position: "8",
                status: 0,
            },
            {
                position: "9",
                status: 0,
            }
        ],
    },
    methods: {
        statusChange(index) {
            click_music.play();
            //確認遊戲是否結束
            if (
                this.turn != 0 &&
                this.cols[index].status != this.player_1 &&
                this.cols[index].status != this.player_2
            ) {
                this.cols[index].status = this.turn;
            }

            //更換步驟，要確認是否此框框跟目前的玩家是一樣的，才能輪到下一位。
            if (this.cols[index].status != 0 &&
                this.cols[index].status == this.turn) {
                if (this.turn == this.player_1) {
                    this.turn = this.player_2;
                } else if (this.turn == this.player_2) {
                    this.turn = this.player_1;
                }
            }
            this.winnerGose();
        },
        winnerGose() {
            //判斷勝負的格式
            let count_o;
            let count_x;
            let winner_case = [
                [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7],
                [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];
            winner_case.forEach((val) => {
                count_o = 0;
                count_x = 0;
                val.forEach((_val) => {
                    if (this.cols[_val - 1].status == this.player_1) {
                        count_o += 1;
                    } else if (this.cols[_val - 1].status == this.player_2) {
                        count_x += 1;
                    }
                })
                if (count_o == 3) {
                    this.wintext = '遊戲結束，' + this.player_1 + '獲勝';
                    this.turn = 0;
                } else if (count_x == 3) {
                    this.wintext = '遊戲結束，' + this.player_2 + '獲勝';
                    this.turn = 0;
                }
            });

            //表示遊戲還沒有人獲勝
            if (this.turn != 0) {
                let count_all = 0;
                this.cols.forEach((val) => {
                    if (val.status == this.player_1 || val.status == this.player_2) {
                        count_all += 1;
                    }
                });
                if (count_all == 9) {
                    this.turn = 0;
                    this.wintext = '遊戲結束，不分勝負。';
                }
            }
        },
        start() {
            this.cols.forEach((val) => {
                val.status = 0;
            });
            this.turn = this.player_1;
            this.$el.querySelector('.box').style.cursor = 'pointer';
        },
        clear() {
            this.cols.forEach((val) => {
                val.status = 0;
            });
            this.turn = 0;
            this.wintext = '遊戲清除';
            this.$el.querySelector('.box').style.cursor = 'not-allowed';
        },
        changePlayer() {
            var player_1 = prompt("請輸入玩家1的姓名", "蟋蟀哥");
            this.player_1 = player_1;
            var player_2 = prompt("請輸入玩家2的姓名", "霉女");
            this.player_2 = player_2;
            this.start();
        },
        play() {
            bg_audio.play();
        },
        pause() {
            bg_audio.pause();
        },
        next() {
            let current_index = 0;
            let current_value = 'asset/sound/';
            all_bg.forEach((value, index) => {
                if (current_value + value + '.mp3' == bg_audio.src) {
                    current_index = index;
                }
            });
            current_index += 1;
            if (all_bg.length == current_index) {
                current_index = 0;
            }
            bg_audio.src = 'asset/sound/' + all_bg[current_index] + '.mp3';
            bg_audio.play();
        },
        last() {
            let current_index = 0;
            let current_value = 'asset/sound/';
            all_bg.forEach((value, index) => {
                if (current_value + value + '.mp3' == bg_audio.src) {
                    current_index = index;
                }
            });
            current_index -= 1;
            if (current_index == -1) {
                current_index = all_bg.length - 1;
            }
            bg_audio.src = 'asset/sound/' + all_bg[current_index] + '.mp3';
            bg_audio.play();
        },
    },
})