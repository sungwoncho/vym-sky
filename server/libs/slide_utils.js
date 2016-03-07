import _ from 'lodash';

export default function _s(slides) {
  let wrapped = {
    _val: slides,
  };

  return _.assign(wrapped, utils);
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
  getVal() {
    return this._val;
  },

  sort() {
    this._val = _.sortBy(this._val, 'number');

    return this;
  },

  setSlideNumber(uid, number) {
    for (var i = 0; i < this._val.length; i++) {
      if (this._val[i].uid === uid) {
        this._val[i].number = number;
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

    bumpSlideNumbers(this._val, options);
    return this;
  },

  add(slide) {
    this._val.push(slide);
    return this;
  },

  update(query, modifier, options) {
    function checkMatch(slide) {
      let keys = Object.getOwnPropertyNames(query);
      for (var i = 0; i < keys.length; i++) {
        let currentKey = keys[i];
        if (query[currentKey] !== slide[currentKey]) {
          return false;
        }
      }

      return true;
    }

    for (var i = 0; i < this._val.length; i++) {
      let currentSlide = this._val[i];
      if (checkMatch(currentSlide)) {
        if (options && options.resetData) {
          console.log('Resetting slide.data');
          currentSlide.data = {};
          currentSlide.options = {};
        }

        _.merge(currentSlide, modifier);
      }
    }

    return this;
  },

  /**
   * @param condition - an object used to match slide object. e.g. {number: 1}
   */
  remove(condition) {
    this._val = _.reject(this._val, condition);

    return this;
  }
};
