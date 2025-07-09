export interface Service<Commands, CommandReturnType = void> {
    run<C extends keyof Commands>(command: C, commandData: Commands[C]): CommandReturnType;
}