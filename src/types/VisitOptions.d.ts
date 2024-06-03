export type GlobalEventsMap = {
  before: {
    parameters: [PendingVisit]
    details: {
      visit: PendingVisit
    }
    result: boolean | void
  }
  start: {
    parameters: [PendingVisit]
    details: {
      visit: PendingVisit
    }
    result: void
  }
  finish: {
    parameters: [ActiveVisit]
    details: {
      visit: ActiveVisit
    }
    result: void
  }
  success: {
    parameters: [Page]
    details: {
      page: Page
    }
    result: void
  }
  error: {
    parameters: [Errors]
    details: {
      errors: Errors
    }
    result: void
  }
}

export type GlobalEventNames = keyof GlobalEventsMap

export type GlobalEventCallback<TEventName extends GlobalEventNames> = (
  ...params: GlobalEventParameters<TEventName>
) => GlobalEventResult<TEventName>

export type VisitOptions = Partial<
  Visit & {
    onBefore: GlobalEventCallback<'before'>
    onStart: GlobalEventCallback<'start'>
    onFinish: GlobalEventCallback<'finish'>
    onSuccess: GlobalEventCallback<'success'>
    onError: GlobalEventCallback<'error'>
  }
>
