// CLass for the town elements
class TownElements {
  constructor(name, buildYear) {
    this.name = name;
    this.buildYear = buildYear;
  }
}

// Class for the Parks elements
class Parks extends TownElements {
  constructor(name, buildYear) {
    super(name, buildYear);
  }
}

// Class for the Streets elements
class Streets extends TownElements {
  constructor(name, buildYear) {
    super(name, buildYear);
  }
}
