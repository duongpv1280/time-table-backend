export class JobEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description?: string,
    public readonly status?: "INPROGRESS" | "COMPLETED" | "FAILED",
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {
    this.name = name;
    if (!!description) {
      this.description = description;
    }
    if (status == null)
      this.status = "INPROGRESS";
    else
      this.status = status;
  }
}

export class JobCreateInput {
  constructor(
    public readonly name: string,
    public readonly description?: string,
  ) {}
}

export class JobUpdateInput {
  constructor(
    public readonly id: string,
    public readonly status: string,
  ) {}

  public validate(): Error | null {
    if (this.status !== "COMPLETED" && this.status !== "FAILED") {
      return Error("Invalid status")
    }
    return null
  }
}