@Schema({ versionKey: false })
class ArrayChronologies {
  @Prop()
  PPO: string;

  @Prop([String])  // Указание, что это массив строк
  Chronology: string[];
}
