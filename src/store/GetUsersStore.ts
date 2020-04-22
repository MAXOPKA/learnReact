import { runInAction } from "mobx";
import { types, cast } from "mobx-state-tree";
import UsersAPIService from "../services/api/Users";
import IUser from "../interfaces/IUser";

export const userItem = types.model("UserItem", {
  id: types.number,
  name: types.string
})

const getUsersStore = types.model({
    users: types.optional(types.array(userItem), []),
    isLoading: types.optional(types.boolean, false),
    error: types.optional(types.boolean, false),
    errorMessage: types.optional(types.string, ""),
  }).actions(self => ({
    setIsLoading(isLoading: boolean) {
      self.isLoading = isLoading;
    },
    setUsers(users: IUser[]) {
      self.users = cast(users);
    },
    getUsers(filter: string) {
      this.setIsLoading(true);

      UsersAPIService.getUsers(filter)
      .then(
        (result) => {
          runInAction("getUsersSuccess", () => {
            this.setUsers(result);
            this.setIsLoading(false);
          });
        },
        (error) => {
          runInAction("getUsersError", () => {
            this.setUsers([]);
            this.setIsLoading(false);
          });
        }
      )
    },
}))

export default getUsersStore.create();
