import Barba from 'barba.js';
import {TimelineMax} from 'gsap';


Barba.Dispatcher.on('linkClicked', function(el) {
  // lastClicked = el;
});

var ExpandTransition = Barba.BaseTransition.extend({
  start: function() {
    Promise
      .all([this.newContainerLoading, this.zoom()])
      .then(this.showNewPage.bind(this));
  },

  zoom: function() {
    var deferred = Barba.Utils.deferred();

    let tl = new TimelineMax();
    tl.to('body',1,{y:100,onComplete: function() {
      deferred.resolve();
    }});
    return deferred.promise;
  },

  showNewPage: function() {
    this.done();
  }
});

Barba.Pjax.getTransition = function() {
  var transitionObj = ExpandTransition;

  //Barba.HistoryManager.prevStatus().namespace
  return transitionObj;
};


Barba.Pjax.start();
