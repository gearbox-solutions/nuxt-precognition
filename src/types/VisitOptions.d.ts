export type GlobalEventsMap = {
  before: {
    parameters: [PendingVisit];
    details: {
      visit: PendingVisit;
    };
    result?: boolean;
  };
  start: {
    parameters: [PendingVisit];
    details: {
      visit: PendingVisit;
    };
  };
  finish: {
    parameters: [ActiveVisit];
    details: {
      visit: ActiveVisit;
    };
  };
  success: {
    parameters: [Page];
    details: {
      page: Page;
    };
  };
  error: {
    parameters: [Errors];
    details: {
      errors: Errors;
    };
  };
};

export type GlobalEventNames = keyof GlobalEventsMap;

export type GlobalEventCallback<TEventName extends GlobalEventNames> = (
  ...params: GlobalEventParameters<TEventName>
) => GlobalEventResult<TEventName>;

export type VisitOptions = Partial<
  Visit & {
    onBefore: GlobalEventCallback<"before">;
    onStart: GlobalEventCallback<"start">;
    onFinish: GlobalEventCallback<"finish">;
    onSuccess: GlobalEventCallback<"success">;
    onError: GlobalEventCallback<"error">;
  }
>;
