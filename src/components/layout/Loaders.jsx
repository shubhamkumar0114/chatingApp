import { Grid , Skeleton } from '@mui/material';
import React from 'react'

const LayoutLoader = () => {
  return (
    <div>
      {" "}
      <Grid
        container
        minHeight="calc(100vh - 4rem)"
        wrap="nowrap"
        spacing={"1rem"}
      >
        {/* LEFT */}
        <Grid
          sx={{
            width: 500, // fixed sidebar
            display: { xs: "none", md: "block" },
          }}
        >
          <Skeleton variant="rectangular" height={"100dvh"} />
        </Grid>

        {/* CENTER (AUTO EXPAND) */}
        <Grid
          sx={{
            flexGrow: 1, // ⭐ full remaining width
          }}
        >
          <Skeleton variant="rectangular" height={"100dvh"} />
        </Grid>

        {/* RIGHT */}
        <Grid
          sx={{
            width: 500, // fixed profile panel

            display: { xs: "none", lg: "block" },
          }}
        >
          <Skeleton variant="rectangular" height={"100vh"} />
        </Grid>
      </Grid>
    </div>
  );
}

export default LayoutLoader;
