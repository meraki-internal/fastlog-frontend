import UserRepository from '@repositories/UserRepository'
test("it should be ok", async () => {
    const userRepository = new UserRepository();
    const user = await userRepository.findUserByEmail("ajjunior33@gmail.com");
    expect(user.name).toEqual("André Souza");
})