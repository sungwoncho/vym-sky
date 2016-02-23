import _ from 'lodash';

export default function _s(slides) {
  return _.assign(slides, utils);
}

function bumpSlideNumbers(slides, options) {
  function compare(left, right, operator) {
    switch (operator) {
      case '>':   return left > right;
      case '<':   return left < right;
      case '>=':  return left >= right;
      case '<=':  return left <= right;
      case '==':  return left == right;
      case '!=':  return left != right;
      case '===': return left === right;
      case '!==': return left !== right;
    }
  }

  function getCondition(slide) {
    return compare(slide.number, options.from, options.fromInclusive ? '>=' : '>') &&
    compare(slide.number, options.to, options.toInclusive ? '<=' : '<');
  }

  slides.forEach(function (slide) {
    if (getCondition(slide)) {
      slide.number += options.delta;
    }
  });

  return slides;
}

let utils = {
  sort() {
    return _.sortBy(this, 'number');
  },

  setSlideNumber(uid, number) {
    for (var i = 0; i < this.length; i++) {
      if (this[i].uid === uid) {
        this[i].number = number;
        break;
      }
    }

    return this;
  },

  bumpNumbers(from, to, delta) {
    let options = {from, to, delta, toInclusive: true};

    if (delta < 0) {
      options.fromInclusive = false;
    } else if (delta > 0) {
      options.fromInclusive = true;
    }

    return bumpSlideNumbers(this, options);
  },

  add(slide) {
    this.push(slide);
    console.log('this', this);
    return this;
  },

  /**
   * @param condition - an object used to match slide object. e.g. {number: 1}
   */
  remove(condition) {
    return _.reject(this, condition);
  }
};
