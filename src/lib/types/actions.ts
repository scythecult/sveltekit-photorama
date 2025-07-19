import type { SubmitFunction } from '@sveltejs/kit';

// TODO Refactor?
type BaseResponse = {
  isLoading?: boolean;
  message?: string;
};

type ValidationResult = {
  validationResult: {
    isFileSizeValid: boolean;
    isFileTypeValid: boolean;
    isImageDimensionsValid: boolean;
  };
  emptyFields: string[];
};

type Success = BaseResponse & {
  isAvailable: boolean;
};

type Failure = BaseResponse &
  ValidationResult & {
    isValid: boolean;
  };

export type TypedSubmitFunction = SubmitFunction<Success, Failure>;
