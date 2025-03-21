import { MinLengthValidator } from "@/utils/validators/MinLengthValidator";
import { ValidationStrategy } from "./ValidationStrategy";

export class ArticleValidationStrategy implements ValidationStrategy {
  validate(data: { title: string; content: string; userId: string }): boolean {
    const titleValid = new MinLengthValidator(1).validate(data.title);
    const contentValid = new MinLengthValidator(1).validate(data.content);
    const userIdValid = new MinLengthValidator(1).validate(data.userId);

    return titleValid && contentValid && userIdValid;
  }
}
