import { useLocation } from "@reach/router"
import useStore from "decentraland-gatsby/dist/hooks/useStore"
import EntityStore, { EntityStoreState } from "decentraland-gatsby/dist/utils/EntityStore"
import useProfile from "decentraland-gatsby/dist/hooks/useProfile"
import { SessionEventAttributes } from "../entities/Event/types"
import url from "../utils/url"
import useAsyncEffect from "decentraland-gatsby/dist/hooks/useAsyncEffect"
import API from "decentraland-gatsby/dist/utils/api/API"
import Events from "../api/Events"

export type SiteStore = {
  events?: EntityStore<SessionEventAttributes>
}

export type SiteState = {
  events?: Partial<EntityStoreState<SessionEventAttributes>>
}

export type SiteLocationState = {
  state?: SiteState
  replace?: boolean
}

const INITIAL_STATE = { loading: true }

export default function useSiteStore(siteInitialState: SiteLocationState = {}, initialState = INITIAL_STATE) {
  const location = useLocation()
  const eventId = url.getEventId(location)
  const [profile, profileActions] = useProfile()
  const events = useStore<SessionEventAttributes>(siteInitialState?.state?.events || INITIAL_STATE)
  const eventsState = events.getState()


  useAsyncEffect(async () => {
    if (!profileActions.loading && eventsState.loading) {
      events.clear()

      const [loadedEvents, event] = await Promise.all([
        API.catch(Events.get().getEvents()),
        eventId && API.catch(Events.get().getEventById(eventId))
      ])

      const newEvents: SessionEventAttributes[] = loadedEvents || []
      if (event) {
        newEvents.push(event)
      }

      events.setEntities(newEvents)
    }
  }, [profile, profileActions.loading])

  function getNavigationState(extraState: Record<string, any> = {}, replace: boolean = false): SiteLocationState {
    return {
      state: {
        events: events.getState(),
        ...extraState,
      },
      replace
    }
  }

  return {
    events,
    getNavigationState
  }
}

