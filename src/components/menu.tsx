import { Link, useLocation } from 'react-router-dom'
import {
  MenuLink,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from '@/components/ui/navigation-menu'

export function Menu() {
  const location = useLocation()
  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-5">
        <NavigationMenuItem asChild>
          <Link to="/" replace>
            <MenuLink active={location.pathname === '/'}>Home</MenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem asChild>
          <Link to="/new-citizen" replace>
            <MenuLink active={location.pathname === '/new-citizen'}>
              New Citizen
            </MenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
