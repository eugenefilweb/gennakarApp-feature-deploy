export type Barangay = {
  brgyCode: number,
  citymunCode: number,
  id: number,
  text: string,
  type: string,
}

export type Municipality = {
  citymunCode: number,
  id: number,
  provCode: number,
  text: string,
  type: string,
}

export type Province = {
  id: number,
  provCode: number,
  regCode: number,
  text: string,
  type: string,
}

export type Region = {
  id: number,
  island_group: number,
  regCode: number,
  text: string,
  type: string,
}


export type Island = {
  id: number,
  text: string,
  icon: string,
  li_attr: {
    id: number,
  },
  a_attr: {
    href: string,
    id: string
  },
  state: {
    loaded: boolean,
    opened: boolean,
    selected: boolean,
    disabled: boolean,
    failed: boolean,
    loading: boolean
  },
  data: {
    type: string
  }
}