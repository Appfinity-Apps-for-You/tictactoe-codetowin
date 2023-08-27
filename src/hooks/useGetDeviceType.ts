import { useMediaQuery, useTheme } from '@mui/material'
export enum Device {
  DESKTOP,
  TABLET,
  MOBILE
}
export default function useGetDeviceType() {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  return {
    type: isDesktop
      ? Device.DESKTOP
      : isMobile
        ? Device.MOBILE
        : Device.TABLET,
    isDesktop: isDesktop,
    isMobile: isMobile,
    isTablet: !isDesktop && !isMobile
  }
}