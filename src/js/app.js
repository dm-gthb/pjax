import Barba from 'barba.js';
import {TimelineMax} from 'gsap';
var lastClicked;

Barba.Dispatcher.on('linkClicked', function(el) {
  lastClicked = el;
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

    let left = lastClicked.getBoundingClientRect().left;

    let cloned = lastClicked.cloneNode(true);

    let screenWidth = $(window).width();

    cloned.classList.add('is-cloned');


    this.oldContainer.appendChild(cloned);

    tl.set(cloned, { x: left });

    tl.to(cloned,1,{x:0, width:screenWidth, onComplete: function() {
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
