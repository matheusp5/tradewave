export abstract class BaseEntity<Props> {
  private _id: string
  protected props: Props

  public get id() {
    return this._id
  }

  public equals(entity: BaseEntity<unknown>) {
    return entity.id === this.id
  }

  protected constructor(id: string, props: Props) {
    this.props = props
    this._id = id
  }
}
