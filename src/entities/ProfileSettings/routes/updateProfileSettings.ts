import isAdmin from "decentraland-gatsby/dist/entities/Auth/isAdmin"
import { WithAuth } from "decentraland-gatsby/dist/entities/Auth/middleware"
import RequestError from "decentraland-gatsby/dist/entities/Route/error"
import { AjvObjectSchema } from "decentraland-gatsby/dist/entities/Schema/types"
import { createValidator } from "decentraland-gatsby/dist/entities/Route/validate"
import isEthereumAddress from "validator/lib/isEthereumAddress"

import ProfileSettingsModel from "../model"
import {
  ProfileSettingsAttributes,
  updateProfileSettingsSchema,
} from "../types"
import { canEditAnyProfile } from "../utils"
import { getMyProfileSettings } from "./getMyProfileSettings"

export const validateProfileSettings =
  createValidator<ProfileSettingsAttributes>(
    updateProfileSettingsSchema as AjvObjectSchema
  )

export async function updateProfileSettings(req: WithAuth) {
  const currentUserProfile = await getMyProfileSettings(req)
  if (!isAdmin(req.auth) && !canEditAnyProfile(currentUserProfile)) {
    throw new RequestError(`Forbidden`, RequestError.Forbidden)
  }

  const user = req.params.profile_id.toLowerCase()
  if (isEthereumAddress(user)) {
    throw new RequestError(`Not found "${user}" profile`, RequestError.NotFound)
  }

  const profile = ProfileSettingsModel.findOne({ user })
  if (!profile) {
    throw new RequestError(`Not found "${user}" profile`, RequestError.NotFound)
  }

  const updateAttributes = validateProfileSettings(req.body)
  const newProfile: ProfileSettingsAttributes = {
    ...profile,
    ...updateAttributes,
  }

  await ProfileSettingsModel.update(newProfile, { user })
  return newProfile
}
