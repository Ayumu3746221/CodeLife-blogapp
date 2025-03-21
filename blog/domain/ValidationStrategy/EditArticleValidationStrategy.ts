import { MinLengthValidator } from "@/utils/validators/MinLengthValidator";
import { ArticleValidationStrategy } from "./ArticleValidationStrategy";
import { ValidationStrategy } from "./ValidationStrategy";

export class EditArticleValidationStrategy
  extends ArticleValidationStrategy
  implements ValidationStrategy
{
  validate(data: {
    id: string;
    title: string;
    content: string;
    userId: string;
  }): boolean {
    // idがなかった場合、falseを返す
    const idValid = new MinLengthValidator(1).validate(data.id);
    if (!idValid) return false;

    //他のバリデーションはArticleValidationStrategyに任せる
    return super.validate({
      title: data.title,
      content: data.content,
      userId: data.userId,
    });
  }
}
