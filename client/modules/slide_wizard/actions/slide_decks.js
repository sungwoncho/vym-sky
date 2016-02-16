export default {
  showSlide({FlowRouter}, slideNumber) {
    FlowRouter.setQueryParams({slideNumber: slideNumber});
  }
};
