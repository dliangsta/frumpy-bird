function AI() {
      this.threshold = 0.5;
      this.play = setInterval(this.play.bind(this), 1000.0 / 6000);
      this.playing = false;
      this.velocity = 0;
      this.prevvelocity = 0;
      this.strict = false;
      this.paused = false;
}

AI.prototype.play = function () {
      if (this.paused) {
            return;
      }
      if (!this.playing) {
            return;
      }
      if (this.collisionPredicted()) {
            screenClick();
      }

};

AI.prototype.collisionPredicted = function () {
      var looselyinsidepipes = this.boxright - this.pipeleft > 0 || (this.boxleft - this.piperight < 0 && this.boxleft - this.pipeleft > 0);
      var strictlyinsidepipes = this.boxleft - this.pipeleft > 0 && this.boxright - this.piperight < 0;
      var approachingpipe = this.boxright - this.pipeleft < 0 && this.boxright - this.pipeleft > -50;
      var underpipetop = this.boxtop - this.pipetop > 40;
      if (!strictlyinsidepipes) {
            this.strict = false;
      }
      if (underpipetop) {
            if (this.boxright - this.pipeleft > 0 && this.boxleft - this.pipeleft < 30 && !this.strict && this.pipebottom - this.boxbottom < 20) {
                  this.strict = true;
                  return true;
            } else if (looselyinsidepipes && this.piperight > this.boxright && this.pipebottom - this.boxbottom < 10) {
                  return true;
            } else if (this.boxright > this.piperight && this.boxleft + this.boxwidth/2 > this.piperight && this.boxbottom < this.pipebottom - 50) {
                  return false;
            } else if (this.velocity > 7 && this.pipebottom > this.boxbottom && this.boxtop > this.pipetop + 60 && this.boxright < this.piperight) {
                  return true;
            } else if (this.pipeleft - this.boxright < 50 && this.pipeleft - this.boxright > 0 && this.pipebottom < this.boxbottom) {
                  return true;
            } else if (this.pipeleft - this.boxright > 50 && this.pipeleft - this.boxright < 200 && this.boxtop - this.pipetop > 40) {
                  return true;
            }
      }
      if (this.pipeleft - this.boxright > 200 && this.boxbottom > $("#land").offset().top - 25) {
            return true;
      }

      return false;
};